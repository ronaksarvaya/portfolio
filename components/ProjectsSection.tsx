import Image from 'next/image';

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'The BR Project',
      url: 'https://ronaksarvaya.github.io/The-BR-Project/',
      image: '/Project1.png',
      rotation: '-rotate-[10deg]',
      marginLeft: 'ml-20'
    },
    {
      id: 2,
      title: 'I Code This',
      url: 'https://ronaksarvaya.github.io/i_code_this/',
      image: '/Project2.png',
      rotation: 'rotate-[11deg]',
      marginLeft: '-ml-12'
    },
    {
      id: 3,
      title: 'DentTech',
      url: 'https://ronaksarvaya.github.io/DentTech/',
      image: '/Project3.png',
      rotation: 'rotate-[1deg]',
      marginLeft: '-ml-[56em] mt-72'
    }
  ];

  return (
    <section className="projects opacity-0 py-16 px-5 bg-white" id="projects">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">MY PROJECTS</h1>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {projects.map((project) => (
          <div key={project.id} className="mt-4">
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={project.image}
                alt={project.title}
                width={640}
                height={400}
                className={`w-[40em] cursor-pointer transition-transform hover:scale-105 ${project.rotation} ${project.marginLeft}`}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
