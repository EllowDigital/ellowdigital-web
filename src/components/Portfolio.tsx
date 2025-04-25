import { ExternalLink, Code, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const categories = [
  "All",
  "UI/UX",
  "Website",
  "Web App",
  "Mobile App",
  "Desktop App",
];

const projects = [
  {
    title: "TypeBlitz",
    category: "Desktop App",
    image: "/images/projects_img/project1_typeblitz.webp",
    description:
      "TypeBlitz is an advanced typing application that helps users enhance their typing speed and accuracy through personalized exercises and real-time feedback.",
    tech: ["Python", "SQLite3"],
    link: "https://typeblitz.netlify.app/",
  },

  // {
  //   title: "FashionForward Mobile App",
  //   category: "Mobile App",
  //   image: "/placeholder.svg",
  //   description: "Fashion discovery app with AR try-on features and social sharing",
  //   tech: ["React Native", "Firebase", "ARKit", "Redux"],
  //   link: "#"
  // },
  // {
  //   title: "Global Travel Experience",
  //   category: "UI/UX",
  //   image: "/placeholder.svg",
  //   description: "Complete UX redesign for a premium travel booking platform",
  //   tech: ["Figma", "Adobe XD", "InVision", "After Effects"],
  //   link: "#"
  // },
  // {
  //   title: "ArtisanMarket",
  //   category: "E-Commerce",
  //   image: "/placeholder.svg",
  //   description: "Marketplace connecting artisans with global customers",
  //   tech: ["Next.js", "Stripe", "Sanity.io", "Vercel"],
  //   link: "#"
  // },
  {
    title: "Ghatak Sports Academy India™",
    category: "Website",
    image: "/images/projects_img/project2_gsai.webp",
    description: "A dynamic website for Ghatak Sports Academy India™, designed to enhance communication and provide information about their sports programs, events, and academy updates.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://ghatakgsai.netlify.app/",
  }

];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (dividerRef.current) observer.observe(dividerRef.current);
    if (filterRef.current) observer.observe(filterRef.current);

    // Add observation for each project card
    projectsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (dividerRef.current) observer.unobserve(dividerRef.current);
      if (filterRef.current) observer.unobserve(filterRef.current);

      // Remove observation for each project card
      projectsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [filter]); // Re-run when filter changes to observe new elements

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section
      id="portfolio"
      className="section-container py-24 relative overflow-hidden snap-start"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl morph-shape"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl morph-shape"
        style={{ animationDelay: "7s" }}
      ></div>

      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="section-title reveal-animate">
          Our Portfolio
        </h2>
        <div
          ref={dividerRef}
          className="animated-divider reveal-animate mb-12"
        ></div>

        {/* Category filter */}
        <div
          ref={filterRef}
          className="flex flex-wrap justify-center gap-4 mb-12 reveal-animate"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full transition-all ${filter === category
                ? "bg-brand-yellow text-black font-medium"
                : "bg-card hover:bg-brand-yellow/20"
                }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectsRef.current[index] = el)}
              className="reveal-animate opacity-0 transform translate-y-5"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="overflow-hidden card-3d tilt-effect border border-border h-full">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end justify-center p-6 transition-opacity duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <Button className="bg-brand-yellow hover:bg-brand-gold text-black">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        View Project <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-brand-yellow/10 text-brand-gold px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button className="bg-brand-yellow text-black hover:bg-brand-gold">
            <a href="#portfolio" className="flex items-center">
              View All Projects <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
