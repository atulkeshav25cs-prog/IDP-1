"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { User, Mail, Briefcase, GraduationCap, Link as LinkIcon, Camera, Save, CheckCircle2, Loader2, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    bio: "",
    education: "",
    skills: "",
    careerGoals: "",
    workStyle: "",
    portfolioUrl: "",
    linkedinUrl: ""
  });

  useEffect(() => {
    if (user?.unsafeMetadata) {
      setFormData({
        bio: (user.unsafeMetadata.bio as string) || "",
        education: (user.unsafeMetadata.education as string) || "",
        skills: (user.unsafeMetadata.skills as string) || "",
        careerGoals: (user.unsafeMetadata.careerGoals as string) || "",
        workStyle: (user.unsafeMetadata.workStyle as string) || "",
        portfolioUrl: (user.unsafeMetadata.portfolioUrl as string) || "",
        linkedinUrl: (user.unsafeMetadata.linkedinUrl as string) || ""
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await user.update({
        unsafeMetadata: {
          ...formData
        }
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  // Calculate completion percentage
  const fields = Object.values(formData);
  const filledFields = fields.filter(val => val.trim().length > 0).length;
  const completionPercent = Math.round(((filledFields + 2) / (fields.length + 2)) * 100); // +2 for name and email

  return (
    <div className="space-y-8 max-w-5xl pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information, skills, and career preferences.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="btn-primary"
        >
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : isSaved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {isSaved ? "Saved Successfully" : "Save Changes"}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="space-y-6">
          <div className="premium-card p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4 group cursor-pointer">
              <img 
                src={user?.imageUrl} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-4 border-background shadow-md group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="font-display font-bold text-xl">{user?.fullName || "User"}</h2>
            <p className="text-sm text-muted-foreground flex items-center justify-center mt-1">
              <Mail className="w-3.5 h-3.5 mr-1" /> {user?.primaryEmailAddress?.emailAddress}
            </p>
            
            <div className="mt-6 pt-6 border-t border-border text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-bold text-primary">{completionPercent}%</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${completionPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="premium-card p-6">
            <h3 className="font-display font-bold mb-4 flex items-center"><FileText className="w-4 h-4 mr-2 text-primary" /> Resume</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-secondary/30 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium mb-1">Upload Resume (PDF)</p>
              <p className="text-xs text-muted-foreground">Used for AI tailoring</p>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Fields */}
        <div className="md:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 md:p-8">
            <h3 className="font-display font-bold text-xl mb-6">About Me</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Professional Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your background and what you're looking for..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-32 text-sm"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <GraduationCap className="w-4 h-4 inline-block mr-1 text-primary" /> Education
                  </label>
                  <input 
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. B.S. Computer Science"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Briefcase className="w-4 h-4 inline-block mr-1 text-primary" /> Preferred Work Style
                  </label>
                  <select 
                    name="workStyle"
                    value={formData.workStyle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm appearance-none"
                  >
                    <option value="">Select work style...</option>
                    <option value="Remote">100% Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Office">In-Office</option>
                    <option value="Flexible">Flexible / Digital Nomad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Key Skills (comma separated)</label>
                <input 
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, UI Design, Agile, Copywriting"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Career Goals</label>
                <textarea 
                  name="careerGoals"
                  value={formData.careerGoals}
                  onChange={handleChange}
                  placeholder="Where do you see yourself in 3-5 years?"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-24 text-sm"
                />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6 md:p-8">
            <h3 className="font-display font-bold text-xl mb-6">Social Links</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <LinkIcon className="w-4 h-4 inline-block mr-1 text-primary" /> Portfolio / Website
                </label>
                <input 
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <LinkIcon className="w-4 h-4 inline-block mr-1 text-[#0A66C2]" /> LinkedIn Profile
                </label>
                <input 
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
