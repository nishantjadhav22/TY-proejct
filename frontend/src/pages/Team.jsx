import React from "react";
import "../styles/Team.css";
import sudanvaImg from "../assets/sudanva.jpg";
import rakshitaImg from "../assets/rakshita.jpg";
import sagarImg from "../assets/sagar.jpg";
import laxmikantImg from "../assets/laxmikant.jpg";
import akashImg from "../assets/akash.jpg";
import malikarjunImg from "../assets/malikarjun.jpg";


import {
  Users,
  Code,
  Brain,
  Palette,
  Shield,
  Target,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Phone,
  Crown
} from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Sudanva",
      role: "Team Leader & Technical Lead",
      bio: "Leading the CareerGuide vision through technical innovation and strategic guidance.",
      skills: ["Full-Stack", "AI/ML", "Leadership"],
      image: sudanvaImg,
      isLeader: true,
      email: "sudanva7@gmail.com",
      phone: "+91 8310491208",
      social: {
        linkedin: "https://www.linkedin.com/",
        twitter: "https://x.com/",
        github: "https://github.com/"
      }
    },
    {
      name: "Rakshita Patil",
      role: "QA & Testing Specialist",
      bio: "Ensures quality and best user experience.",
      skills: ["Testing", "Debugging", "UX"],
      image: rakshitaImg
    },
    {
      name: "Sagar Kuligoud",
      role: "Project Coordinator",
      bio: "Manages workflows and presentations.",
      skills: ["Management", "Planning"],
      image: sagarImg
    },
    {
      name: "Laxmikant Talli",
      role: "Data Analyst",
      bio: "Turns data into meaningful insights.",
      skills: ["Data", "Analysis"],
      image:laxmikantImg
    },
    {
      name: "Akash Kambar",
      role: "Innovation Contributor",
      bio: "Creative problem solver.",
      skills: ["Innovation", "Research"],
      image: akashImg
    },
    {
      name: "Malikarjun Kadagoudr",
      role: "Strategic Analyst",
      bio: "Strategic thinking & development.",
      skills: ["Strategy", "Research"],
      image: malikarjunImg
    }
  ];

  return (
    <div className="team-page">
      {/* Hero */}
      <section className="team-hero">
        <Users size={40} className="hero-icon" />
        <h1>Our Team</h1>
        <p>
          Meet the passionate people behind CareerGuide.
        </p>
      </section>

      {/* Team Cards */}
      <section className="team-grid">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`team-card ${member.isLeader ? "leader" : ""}`}
          >
            {member.isLeader && (
              <div className="leader-badge">
                <Crown size={16} />
              </div>
            )}

            <img src={member.image} alt={member.name} />

            <h3>{member.name}</h3>
            <span className="role">{member.role}</span>

            <p className="bio">{member.bio}</p>

            <div className="skills">
              {member.skills.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))}
            </div>

            {/* Leader Contact */}
            {member.isLeader && (
              <>
                <div className="contact-buttons">
                  <a href={`mailto:${member.email}`}>
                    <Mail size={16} /> Email
                  </a>
                  <a href={`tel:${member.phone}`}>
                    <Phone size={16} /> Call
                  </a>
                </div>

                <div className="social-links">
                  <a href={member.social.linkedin} target="_blank">
                    <Linkedin size={18} />
                  </a>
                  <a href={member.social.twitter} target="_blank">
                    <Twitter size={18} />
                  </a>
                  <a href={member.social.github} target="_blank">
                    <Github size={18} />
                  </a>
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Team;
