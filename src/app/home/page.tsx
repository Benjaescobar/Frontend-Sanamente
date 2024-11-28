"use client";
import NavBar from "@/components/navbar/NavBar";

interface OptionsProps {
  title: string;
  content: string;
  href: string;
}

function Options({ title, content, href }: OptionsProps) {
  return (
    <a href={href}>
      <div className="flex flex-col bg-celeste hover:bg-red-300 transition-all max-w-96 px-7 pt-5 pb-7 rounded-lg">
        <p className="font-bold mb-3">{title}</p>
        <p className="text-wrap">{content}</p>
      </div>
    </a>
  );
}

interface ReasonsProps {
  title: string;
}

function Reasons({ title }: ReasonsProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="p-3 border border-red-500 rounded-lg text-red-500">
        {title}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col mt-12 text-center space-y-24">
        <div className="flex flex-col justify-between space-y-6 text-3xl">
          <div>
            <div>
              ¡Bienvenido a
              <span className="text-[#213554] font-semibold"> Sana</span>
              <span className="text-red-500 font-semibold">mente</span>!
            </div>
            <span className="text-lg">
              Puedes comenzar con alguna de las siguientes opciones:
            </span>
          </div>
          <div className="flex justify-center text-lg space-x-16">
            <Options
              title="Agendar con un profesional:"
              content="Busca directamente a un profesional que se adecúe a tus necesidades, y comienza tus sesiones de terapia."
              href="/search"
            />
            <Options
              title="Navegar el feed de Posts profesionales:"
              content="¿No sabes por dónde comenzar? Comienza navegando los posts que hacen los profesionales del sitio, para informarte y conocer a algunos de los psicólogos."
              href="/feed"
            />
            <Options
              title="Acudir a un grupo de ayuda:"
              content="También puedes comenzar buscando un grupo de ayuda, donde puedes compartir experiencias con otros pacientes."
              href="/grupos-apoyo"
            />
          </div>
        </div>
        <div>
          <div className="text-lg mb-6">¿Por qué escogernos a nosotros?</div>
            <div className="flex justify-center space-x-10">
              <Reasons title="Nos adaptamos a tu bolsillo 💰" />
              <Reasons title="Escoges a quien más te acomode 🙋🏼" />
              <Reasons title="Agendas de manera rápida y cómoda 📕" />
              <Reasons title="Chateas con quien quieras 💬" />
            </div>
        </div>
      </div>
    </>
  );
}
