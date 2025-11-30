import Image from 'next/image';

export default function ContactSection() {
  return (
    <section className="contact opacity-0 py-16 px-5 bg-white" id="contact">
      <div className="flex gap-8 items-center max-w-6xl mx-auto">
        <div className="msg w-[10em] font-sans text-black">
          <h3 className="text-2xl font-bold mb-4">CONTACT ME:</h3>
          <p className="mb-4">
            Do you speak Martian? It's ok if you don't, I speak English too. Don't
            be shy! Hit me up! 👇
          </p>
          <a 
            href="mailto:ronaksarvaiya2@gmail.com"
            className="text-blue-600 hover:underline"
          >
            ronaksarvaiya2@gmail.com
          </a>
        </div>

        <div className="c-img-bg h-auto w-[15%]">
          <Image
            src="/contactimg.png"
            alt="Contact"
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
