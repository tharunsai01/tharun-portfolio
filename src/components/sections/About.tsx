import Section from "../Section";

const educationData = [
  {
    institution: "NIIT University",
    degree: "B.Tech in Computer Science and Engineering | Specialization: Cyber Security",
    duration: "2023 - 2027",
    gpa: "CGPA: 6.67/10"
  },
  {
    institution: "Sri Nalanda College",
    degree: "Class XII",
    duration: "2023",
    gpa: "80%"
  },
  {
    institution: "Sri Chaitanya School",
    degree: "Class X",
    duration: "2021",
    gpa: "Completed"
  }
];

export default function About() {
  return (
    <Section id="about" title="About & Education">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Bio & Details */}
        <div className="space-y-8">
          <div className="prose prose-invert prose-slate">
            <p className="text-text-secondary text-lg leading-relaxed">
              B.Tech Computer Science and Engineering specializing in Cyber Security. Passionate about cybersecurity, network defense, ethical hacking, penetration testing, and threat detection. I am dedicated to building technical skills through projects, certifications, and hands-on labs, and eager to contribute to real-world security challenges while continuously expanding my technical expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-panel rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors">
              <h3 className="text-sm font-semibold text-foreground mb-2">Career Objective</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                To contribute to real-world security challenges and build scalable, secure, and resilient infrastructure.
              </p>
            </div>
            
            <div className="bg-panel rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors">
              <h3 className="text-sm font-semibold text-foreground mb-2">Interests</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/5 rounded text-xs">Pen Testing</span>
                <span className="px-2 py-1 bg-white/5 rounded text-xs">Network Defense</span>
                <span className="px-2 py-1 bg-white/5 rounded text-xs">Threat Detection</span>
                <span className="px-2 py-1 bg-white/5 rounded text-xs">Ethical Hacking</span>
              </p>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6 font-heading">Education</h3>
          <div className="relative border-l border-white/10 ml-3 space-y-10">
            {educationData.map((item, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute w-3 h-3 bg-panel border-2 border-accent-cyan rounded-full -left-[6.5px] top-1.5 ring-4 ring-background"></div>
                <div className="flex flex-col xl:flex-row xl:items-baseline gap-1 xl:gap-4 mb-1">
                  <h4 className="text-lg font-medium text-foreground">{item.institution}</h4>
                  <span className="text-sm text-text-secondary font-mono">{item.duration}</span>
                </div>
                <p className="text-text-secondary mb-2 text-sm">{item.degree}</p>
                <div className="inline-flex items-center rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-text-secondary ring-1 ring-inset ring-white/10">
                  {item.gpa}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}
