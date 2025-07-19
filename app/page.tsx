"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Database,
  Cloud,
  Briefcase,
  GraduationCap,
  User,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
} from "lucide-react"
import AdminPanel from "./admin/page"
import LoginForm from "./components/login-form"

// Types
interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  screenshots: string[]
  projectLink?: string
  githubLink?: string
  year: string
}

interface Skill {
  category: string
  skills: string[]
}

interface ResumeConfig {
  enabled: boolean
  fileName: string
  fileUrl: string
  buttonText: string
}

interface AuthConfig {
  username: string
  password: string
  passwordHint: string
}

interface ProfileData {
  name: string
  title: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  summary: string
  profileImage: string
  skills: Skill[]
  projects: Project[]
  experience: any[]
  education: any[]
  resume: ResumeConfig
  auth: AuthConfig
}

// Initial data
const initialData: ProfileData = {
  name: "Abhishek AR",
  title: "Full Stack Python Django Developer",
  location: "Kerala, India",
  email: "abhishekar3690@gmail.com",
  phone: "+91 7356176925",
  linkedin: "linkedin.com/in/abhishekar",
  github: "github.com/abhishekpythoninmakes",
  summary:
    "Full Stack Python Django Developer with 2 years of professional experience. Skilled in developing web applications using Django and Flask frameworks. Proficient in implementing machine learning and deep learning solutions.",
  profileImage: "/placeholder.svg?height=400&width=400",
  resume: {
    enabled: true,
    fileName: "Abhishek_AR_Resume.pdf",
    fileUrl: "/placeholder.pdf",
    buttonText: "Download Resume",
  },
  auth: {
    username: "abhishek",
    password: "123",
    passwordHint: "Your favorite number",
  },
  skills: [
    {
      category: "Programming Languages",
      skills: ["Python", "C", "JavaScript"],
    },
    {
      category: "Web Frameworks",
      skills: ["Django", "Flask", "Django REST Framework", "Next.js"],
    },
    {
      category: "Data Science & AI",
      skills: ["Machine Learning", "Deep Learning", "Data Science", "TensorFlow", "Scikit-learn"],
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "Redis", "PostgreSQL"],
    },
  ],
  projects: [
    {
      id: "1",
      title: "GrowMagics - Community Commerce Platform",
      description:
        "Comprehensive community-driven commerce platform with merchant management system, multi-role architecture, and real-time notifications.",
      technologies: ["Python", "Django", "PostgreSQL", "Redis", "Django Channels", "AWS"],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      projectLink: "https://growmagics.com",
      year: "2024",
    },
    {
      id: "2",
      title: "AeroTag - Smart QR Code Management",
      description:
        "Complex QR code package management system with WhatsApp Business API automation and dynamic customization features.",
      technologies: ["Python", "Django", "WhatsApp Business API", "PostgreSQL", "Redis"],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      year: "2024",
    },
    {
      id: "3",
      title: "eMalayalee - Online News Platform",
      description:
        "High-performance online news platform with Redis caching, external API integration, and comprehensive user engagement system.",
      technologies: ["Python", "Django", "Redis", "External APIs", "Google Search API", "PostgreSQL"],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      year: "2024",
    },
    {
      id: "4",
      title: "BrandExpert - E-commerce CRM",
      description:
        "Comprehensive e-commerce platform with integrated CRM, Stripe payment gateway, and automated email marketing system.",
      technologies: ["Python", "Django", "Stripe API", "Celery", "PostgreSQL", "Email APIs"],
      screenshots: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      year: "2024",
    },
  ],
  experience: [
    {
      title: "Software Developer",
      company: "SMBS Infolab LLC",
      location: "Kochi, Kerala",
      period: "Aug 2023 – Present",
      responsibilities: [
        "Develop and maintain full-stack web applications using Python, Django, and Django REST Framework",
        "Implement machine learning and deep learning solutions for various client projects",
        "Deploy and manage applications on AWS cloud infrastructure",
      ],
    },
    {
      title: "Python Trainer cum Developer",
      company: "Inet Infotech",
      location: "Ernakulam, Kerala",
      period: "July 2022 – July 2023",
      responsibilities: [
        "Conducted training sessions on Python, Django, Flask, Data Science, and Machine Learning",
        "Developed curriculum and training materials for Python programming courses",
        "Created real-world projects to demonstrate practical applications",
      ],
    },
  ],
  education: [
    {
      degree: "MSc in Electronics",
      institution: "Marthoma College Of Science And Technology",
      location: "Kollam, Kerala",
      period: "2020 – 2022",
      university: "University of Kerala",
    },
    {
      degree: "Bachelor's in Electronics",
      institution: "IHRD College Of Applied Science Kundara",
      location: "Kollam, Kerala",
      period: "2017 – 2020",
    },
  ],
}

export default function Portfolio() {
  const [profileData, setProfileData] = useState<ProfileData>(initialData)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAdmin, setShowAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Ensure resume and auth objects exist
        if (!parsedData.resume) {
          parsedData.resume = {
            enabled: true,
            fileName: "Resume.pdf",
            fileUrl: "/placeholder.pdf",
            buttonText: "Download Resume",
          }
        }
        if (!parsedData.auth) {
          parsedData.auth = {
            username: "abhishek",
            password: "123",
            passwordHint: "Your favorite number",
          }
        }
        setProfileData(parsedData)
      } catch (error) {
        console.error("Error parsing saved data:", error)
        setProfileData(initialData)
      }
    }

    // Check if user is already authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleDataUpdate = (newData: ProfileData) => {
    setProfileData(newData)
    localStorage.setItem("portfolioData", JSON.stringify(newData))
  }

  const handleLogin = (username: string, password: string) => {
    if (username === profileData.auth.username && password === profileData.auth.password) {
      setIsAuthenticated(true)
      localStorage.setItem("isAuthenticated", "true")
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    setShowAdmin(false)
  }

  const handleDownloadResume = async () => {
    if (!profileData.resume.enabled || !profileData.resume.fileUrl) {
      toast.error("Resume not available")
      return
    }

    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create download link
      const link = document.createElement("a")
      link.href = profileData.resume.fileUrl
      link.download = profileData.resume.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show success message
      setTimeout(() => {
        setIsDownloading(false)
        setDownloadProgress(0)
        toast.success("Thank you for connecting with me! 🎉", {
          description: "Resume downloaded successfully",
          duration: 4000,
        })
      }, 500)
    } catch (error) {
      setIsDownloading(false)
      setDownloadProgress(0)
      toast.error("Download failed. Please try again.")
    }
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1))
    }
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (showAdmin && !isAuthenticated) {
    return (
      <LoginForm
        onLogin={handleLogin}
        onClose={() => setShowAdmin(false)}
        passwordHint={profileData.auth.passwordHint}
      />
    )
  }

  if (showAdmin && isAuthenticated) {
    return (
      <AdminPanel
        profileData={profileData}
        onDataUpdate={handleDataUpdate}
        onClose={() => setShowAdmin(false)}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Toaster position="top-right" />

      {/* Download Progress Overlay */}
      <AnimatePresence>
        {isDownloading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <Download className="w-full h-full text-cyan-400" />
                </motion.div>

                <h3 className="text-xl font-semibold text-white mb-2">Downloading Resume</h3>
                <p className="text-white/70 mb-6">Please wait while we prepare your download...</p>

                <div className="space-y-2">
                  <Progress value={downloadProgress} className="w-full h-2" />
                  <p className="text-sm text-white/60">{Math.round(downloadProgress)}% complete</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="text-2xl font-bold text-white" whileHover={{ scale: 1.05 }}>
              {profileData.name}
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-white/80 hover:text-white transition-colors capitalize ${
                    activeSection === section ? "text-cyan-400" : ""
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {profileData?.resume?.enabled && (
                <Button
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg disabled:opacity-50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {profileData.resume.buttonText || "Download Resume"}
                </Button>
              )}

              <Button
                onClick={() => setShowAdmin(true)}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {profileData.name}
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 mb-8">{profileData.title}</p>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">{profileData.summary}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.a
                  href={`mailto:${profileData.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </motion.a>

                {profileData?.resume?.enabled && (
                  <motion.button
                    onClick={handleDownloadResume}
                    disabled={isDownloading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    {profileData.resume.buttonText || "Download Resume"}
                  </motion.button>
                )}

                <motion.a
                  href={`https://${profileData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </motion.a>
              </div>

              <div className="flex items-center gap-6 text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {profileData.phone}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <img
                  src={profileData.profileImage || "/placeholder.svg"}
                  alt={profileData.name}
                  className="relative w-80 h-80 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-2xl font-bold text-white">Experience</h3>
                  </div>

                  <div className="space-y-6">
                    {profileData.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="border-l-2 border-cyan-400/30 pl-6 pb-6"
                      >
                        <h4 className="text-xl font-semibold text-white mb-1">{exp.title}</h4>
                        <p className="text-cyan-400 font-medium mb-1">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-white/60 text-sm mb-3">{exp.period}</p>
                        <ul className="text-white/80 text-sm space-y-1">
                          {exp.responsibilities.map((resp: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">•</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="w-8 h-8 text-purple-400" />
                    <h3 className="text-2xl font-bold text-white">Education</h3>
                  </div>

                  <div className="space-y-6">
                    {profileData.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="border-l-2 border-purple-400/30 pl-6 pb-6"
                      >
                        <h4 className="text-xl font-semibold text-white mb-1">{edu.degree}</h4>
                        <p className="text-purple-400 font-medium mb-1">{edu.institution}</p>
                        <p className="text-white/60 text-sm mb-1">
                          {edu.location} • {edu.period}
                        </p>
                        {edu.university && <p className="text-white/60 text-sm">{edu.university}</p>}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profileData.skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full hover:bg-white/15 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {index === 0 && <Code className="w-6 h-6 text-cyan-400" />}
                      {index === 1 && <Database className="w-6 h-6 text-green-400" />}
                      {index === 2 && <User className="w-6 h-6 text-purple-400" />}
                      {index === 3 && <Cloud className="w-6 h-6 text-orange-400" />}
                      <h3 className="text-lg font-semibold text-white">{skillGroup.category}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <motion.div key={skillIndex} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Badge
                            variant="secondary"
                            className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {profileData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 h-full hover:bg-white/15 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                        {project.year}
                      </Badge>
                    </div>

                    <p className="text-white/80 mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => {
                          setSelectedProject(project)
                          setCurrentImageIndex(0)
                        }}
                        variant="outline"
                        size="sm"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-1"
                      >
                        View Details
                      </Button>

                      {project.projectLink && (
                        <Button
                          onClick={() => window.open(project.projectLink, "_blank")}
                          variant="outline"
                          size="sm"
                          className="bg-cyan-500/20 border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/30"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.a
                href={`mailto:${profileData.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors text-center p-8">
                  <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                  <p className="text-white/80">{profileData.email}</p>
                </Card>
              </motion.a>

              <motion.a
                href={`tel:${profileData.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors text-center p-8">
                  <Phone className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                  <p className="text-white/80">{profileData.phone}</p>
                </Card>
              </motion.a>

              <motion.a
                href={`https://${profileData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors text-center p-8">
                  <Linkedin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
                  <p className="text-white/80">Connect with me</p>
                </Card>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 mb-4 md:mb-0">© 2024 {profileData.name}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <motion.a
                href={`https://${profileData.github}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={`https://${profileData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={`mailto:${profileData.email}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                      {selectedProject.year}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => setSelectedProject(null)}
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                {/* Image Gallery */}
                <div className="relative mb-6">
                  <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                    <img
                      src={selectedProject.screenshots[currentImageIndex] || "/placeholder.svg"}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {selectedProject.screenshots.length > 1 && (
                    <>
                      <Button
                        onClick={prevImage}
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={nextImage}
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>

                      <div className="flex justify-center gap-2 mt-4">
                        {selectedProject.screenshots.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentImageIndex ? "bg-cyan-400" : "bg-white/30 hover:bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                    <p className="text-white/80 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    {selectedProject.projectLink && (
                      <Button
                        onClick={() => window.open(selectedProject.projectLink, "_blank")}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Project
                      </Button>
                    )}

                    {selectedProject.githubLink && (
                      <Button
                        onClick={() => window.open(selectedProject.githubLink, "_blank")}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
