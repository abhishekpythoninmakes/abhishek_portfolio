"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, Save, User, Briefcase, GraduationCap, Code, FolderOpen, X } from "lucide-react"

interface AdminPanelProps {
  profileData: any
  onDataUpdate: (data: any) => void
  onClose: () => void
}

const defaultProfileData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  profileImage: "",
  linkedin: "",
  github: "",
  summary: "",
  skills: [],
  projects: [],
  experience: [],
  education: [],
}

export default function AdminPanel({ profileData, onDataUpdate, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState(profileData || defaultProfileData)
  const [newSkill, setNewSkill] = useState("")
  const [newSkillCategory, setNewSkillCategory] = useState("")

  const handleSave = () => {
    onDataUpdate(formData)
    alert("Data saved successfully!")
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const addSkillCategory = () => {
    if (newSkillCategory.trim()) {
      const newCategory = {
        category: newSkillCategory,
        skills: [],
      }
      setFormData({
        ...formData,
        skills: [...formData.skills, newCategory],
      })
      setNewSkillCategory("")
    }
  }

  const addSkillToCategory = (categoryIndex: number) => {
    if (newSkill.trim()) {
      const updatedSkills = [...formData.skills]
      updatedSkills[categoryIndex].skills.push(newSkill)
      setFormData({ ...formData, skills: updatedSkills })
      setNewSkill("")
    }
  }

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedSkills = [...formData.skills]
    updatedSkills[categoryIndex].skills.splice(skillIndex, 1)
    setFormData({ ...formData, skills: updatedSkills })
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      technologies: [],
      screenshots: ["/placeholder.svg?height=600&width=800"],
      projectLink: "",
      githubLink: "",
      year: new Date().getFullYear().toString(),
    }
    setFormData({
      ...formData,
      projects: [...formData.projects, newProject],
    })
  }

  const updateProject = (index: number, field: string, value: any) => {
    const updatedProjects = [...formData.projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    setFormData({ ...formData, projects: updatedProjects })
  }

  const removeProject = (index: number) => {
    const updatedProjects = formData.projects.filter((_: any, i: number) => i !== index)
    setFormData({ ...formData, projects: updatedProjects })
  }

  const addExperience = () => {
    const newExp = {
      title: "Job Title",
      company: "Company Name",
      location: "Location",
      period: "Start - End",
      responsibilities: ["Responsibility 1", "Responsibility 2"],
    }
    setFormData({
      ...formData,
      experience: [...formData.experience, newExp],
    })
  }

  const addEducation = () => {
    const newEdu = {
      degree: "Degree Name",
      institution: "Institution Name",
      location: "Location",
      period: "Start - End",
      university: "University Name",
    }
    setFormData({
      ...formData,
      education: [...formData.education, newEdu],
    })
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          </div>

          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Full Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Job Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Email</Label>
                      <Input
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Phone</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Location</Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Profile Image URL</Label>
                      <Input
                        value={formData.profileImage}
                        onChange={(e) => handleInputChange("profileImage", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">LinkedIn URL</Label>
                      <Input
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">GitHub URL</Label>
                      <Input
                        value={formData.github}
                        onChange={(e) => handleInputChange("github", e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Summary</Label>
                    <Textarea
                      value={formData.summary}
                      onChange={(e) => handleInputChange("summary", e.target.value)}
                      className="bg-white/10 border-white/20 text-white min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Skills Management
                    <div className="flex gap-2">
                      <Input
                        placeholder="New category name"
                        value={newSkillCategory}
                        onChange={(e) => setNewSkillCategory(e.target.value)}
                        className="bg-white/10 border-white/20 text-white w-48"
                      />
                      <Button onClick={addSkillCategory} size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.skills.map((skillGroup: any, categoryIndex: number) => (
                    <div key={categoryIndex} className="border border-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Input
                          value={skillGroup.category}
                          onChange={(e) => {
                            const updatedSkills = [...formData.skills]
                            updatedSkills[categoryIndex].category = e.target.value
                            setFormData({ ...formData, skills: updatedSkills })
                          }}
                          className="bg-white/10 border-white/20 text-white font-semibold"
                        />
                        <Button
                          onClick={() => {
                            const updatedSkills = formData.skills.filter((_: any, i: number) => i !== categoryIndex)
                            setFormData({ ...formData, skills: updatedSkills })
                          }}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {skillGroup.skills.map((skill: string, skillIndex: number) => (
                          <div key={skillIndex} className="flex items-center gap-1">
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                              {skill}
                            </Badge>
                            <Button
                              onClick={() => removeSkill(categoryIndex, skillIndex)}
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Add new skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              addSkillToCategory(categoryIndex)
                            }
                          }}
                        />
                        <Button
                          onClick={() => addSkillToCategory(categoryIndex)}
                          size="sm"
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Projects Management
                    <Button onClick={addProject} className="bg-gradient-to-r from-cyan-500 to-purple-500">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.projects.map((project: any, index: number) => (
                    <div key={project.id} className="border border-white/20 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Project {index + 1}</h3>
                        <Button onClick={() => removeProject(index)} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Project Title</Label>
                          <Input
                            value={project.title}
                            onChange={(e) => updateProject(index, "title", e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Year</Label>
                          <Input
                            value={project.year}
                            onChange={(e) => updateProject(index, "year", e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label className="text-white">Description</Label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, "description", e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Project Link</Label>
                          <Input
                            value={project.projectLink || ""}
                            onChange={(e) => updateProject(index, "projectLink", e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">GitHub Link</Label>
                          <Input
                            value={project.githubLink || ""}
                            onChange={(e) => updateProject(index, "githubLink", e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label className="text-white">Technologies (comma-separated)</Label>
                        <Input
                          value={project.technologies.join(", ")}
                          onChange={(e) =>
                            updateProject(index, "technologies", e.target.value.split(", ").filter(Boolean))
                          }
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Screenshot URLs (one per line)</Label>
                        <Textarea
                          value={project.screenshots.join("\n")}
                          onChange={(e) =>
                            updateProject(index, "screenshots", e.target.value.split("\n").filter(Boolean))
                          }
                          className="bg-white/10 border-white/20 text-white"
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Experience Management
                    <Button onClick={addExperience} className="bg-gradient-to-r from-cyan-500 to-purple-500">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.experience.map((exp: any, index: number) => (
                    <div key={index} className="border border-white/20 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Experience {index + 1}</h3>
                        <Button
                          onClick={() => {
                            const updatedExp = formData.experience.filter((_: any, i: number) => i !== index)
                            setFormData({ ...formData, experience: updatedExp })
                          }}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Job Title</Label>
                          <Input
                            value={exp.title}
                            onChange={(e) => {
                              const updatedExp = [...formData.experience]
                              updatedExp[index].title = e.target.value
                              setFormData({ ...formData, experience: updatedExp })
                            }}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => {
                              const updatedExp = [...formData.experience]
                              updatedExp[index].company = e.target.value
                              setFormData({ ...formData, experience: updatedExp })
                            }}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Location</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) => {
                              const updatedExp = [...formData.experience]
                              updatedExp[index].location = e.target.value
                              setFormData({ ...formData, experience: updatedExp })
                            }}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Period</Label>
                          <Input
                            value={exp.period}
                            onChange={(e) => {
                              const updatedExp = [...formData.experience]
                              updatedExp[index].period = e.target.value
                              setFormData({ ...formData, experience: updatedExp })
                            }}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">Responsibilities (one per line)</Label>
                        <Textarea
                          value={exp.responsibilities.join("\n")}
                          onChange={(e) => {
                            const updatedExp = [...formData.experience]
                            updatedExp[index].responsibilities = e.target.value.split("\n").filter(Boolean)
                            setFormData({ ...formData, experience: updatedExp })
                          }}
                          className="bg-white/10 border-white/20 text-white"
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Education Management
                    <Button onClick={addEducation} className="bg-gradient-to-r from-cyan-500 to-purple-500">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.education.map((edu: any, index: number) => (
                    <div key={index} className="border border-white/20 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Education {index + 1}</h3>
                        <Button
                          onClick={() => {
                            const updatedEdu = formData.education.filter((_: any, i: number) => i !== index)
                            setFormData({ ...formData, education: updatedEdu })
                          }}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => {
                              const updatedEdu = [...formData.education]
                              updatedEdu[index].degree = e.target.value
                              setFormData({ ...formData, education: updatedEdu })
                            }}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => {
                              const updatedEdu = [...formData.education]
                              updatedEdu[index].institution = e.target.value
                              setFormData({ ...formData, education: updatedEdu })
                            }}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-white">Location</Label>
                          <Input
                            value={edu.location}
                            onChange={(e) => {
                              const updatedEdu = [...formData.education]
                              updatedEdu[index].location = e.target.value
                              setFormData({ ...formData, education: updatedEdu })
                            }}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Period</Label>
                          <Input
                            value={edu.period}
                            onChange={(e) => {
                              const updatedEdu = [...formData.education]
                              updatedEdu[index].period = e.target.value
                              setFormData({ ...formData, education: updatedEdu })
                            }}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">University (Optional)</Label>
                        <Input
                          value={edu.university || ""}
                          onChange={(e) => {
                            const updatedEdu = [...formData.education]
                            updatedEdu[index].university = e.target.value
                            setFormData({ ...formData, education: updatedEdu })
                          }}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
