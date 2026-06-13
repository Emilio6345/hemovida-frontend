import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import ChatBot from "./ChatBot";
import "../styles/HomePremium.css";

export const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef(null);
  const [progress, setProgress] = useState(0);

const scrollLeft = () => {

  sliderRef.current?.scrollBy({
    left: -550,
    behavior: "smooth"
  });

  setActiveSlide(prev =>
    prev > 0 ? prev - 1 : 0
  );
};

const scrollRight = () => {

  sliderRef.current?.scrollBy({
    left: 550,
    behavior: "smooth"
  });

  setActiveSlide(prev =>
    prev < featuredSpecialties.length - 1
      ? prev + 1
      : prev
  );
};
const updateProgress = () => {

  const slider = sliderRef.current;

  if (!slider) return;

  const maxScroll =
    slider.scrollWidth - slider.clientWidth;

  const currentScroll =
    slider.scrollLeft;

  const percentage =
    (currentScroll / maxScroll) * 100;

  setProgress(percentage);
};

  const whyHemovida = [
    {
      title: "Especialistas Certificados",
      desc: "Nuestro equipo médico cuenta con acreditaciones internacionales y años de experiencia en sus campos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
      )
    },
    {
      title: "Tecnología Avanzada",
      desc: "Equipamiento de última generación para diagnósticos precisos y tratamientos mínimamente invasivos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M18.4 4.6a10 10 0 1 1-12.8 0"/></svg>
      )
    },
    {
      title: "Atención Personalizada",
      desc: "Cada paciente recibe un plan de cuidado diseñado específicamente para sus necesidades únicas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      )
    },
    {
      title: "Seguridad del Paciente",
      desc: "Protocolos estrictos de bioseguridad y estándares internacionales de calidad hospitalaria.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      )
    }
  ];

  const featuredSpecialties = [
  {
    title: "Cardiología",
    desc: "Diagnóstico y tratamiento cardiovascular avanzado.",
    image: "/images/especialidades/cardiologia.jpeg"
  },
  {
    title: "Pediatría",
    desc: "Atención integral para bebés, niños y adolescentes.",
    image: "/images/especialidades/pediatria.png"
  },
  {
    title: "Ginecología",
    desc: "Salud femenina especializada en todas las etapas.",
    image: "/images/especialidades/ginecologia.jpg"
  },
  {
    title: "Traumatología",
    desc: "Recuperación y cuidado del sistema músculo-esquelético.",
    image: "/images/especialidades/traumatologia.jpeg"
  }
  ,
{
  title: "Neurología",
  desc: "Diagnóstico y tratamiento especializado del sistema nervioso.",
  image: "/images/especialidades/neurologia.jpg"
},
{
  title: "Dermatología",
  desc: "Cuidado integral de la piel, cabello y uñas.",
  image: "/images/especialidades/dermatologia.jpg"
},
{
  title: "Oftalmología",
  desc: "Prevención, diagnóstico y tratamiento de enfermedades visuales.",
  image: "/images/especialidades/oftalmologia.jpg"
},
{
  title: "Medicina Interna",
  desc: "Atención integral para la prevención y tratamiento de enfermedades del adulto.",
  image: "/images/especialidades/medicina-interna.jpg"
},
{
  title: "Endocrinología",
  desc: "Diagnóstico y tratamiento de trastornos hormonales y metabólicos.",
  image: "/images/especialidades/endocrinologia.jpg"
},
{
  title: "Gastroenterología",
  desc: "Especialistas en enfermedades del aparato digestivo.",
  image: "/images/especialidades/gastroenterologia.jpg"
},
{
  title: "Urología",
  desc: "Atención especializada del sistema urinario y salud masculina.",
  image: "/images/especialidades/urologia.jpg"
},
{
  title: "Neumología",
  desc: "Diagnóstico y tratamiento de enfermedades respiratorias.",
  image: "/images/especialidades/neumologia.jpg"
}
];


  const doctors = [
    {
      name: "Dra. Fernanda Bautista",
      spec: "Cirugia Plastica",
      exp: "15+ años de experiencia",
      img: "/images/doctor2.png"
    },
    {
      name: "Dra. Nathaly Sierra",
      spec: "Pediatría",
      exp: "12+ años de experiencia",
      img: "/images/doctor4.png"
    },
    {
      name: "Dr.Evelyn Endara",
      spec: "Medicina Interna",
      exp: "18+ años de experiencia",
      img: "/images/doctor5.png"
    }
  ];

  return (
    <div className="home-premium-container">
      {/* Hero Section */}
      <div className="container-premium">
        <section className="medical-hero-premium">
          <div className="hero-content-premium">
            <h1>Tu salud en manos de <span className="highlight">Especialistas</span></h1>
            <p>En Clínica Hemovida, combinamos calidez humana con excelencia médica para brindarte la mejor atención integral de clase mundial.</p>
            <div className="hero-actions">
              <Link to="/home/products" className="btn-cta-primary">
                Agendar Servicio
              </Link>
            </div>
          </div>
          <img src="/images/hospital-bg.png" alt="Hemovida Hospital" className="hero-image-premium" />
        </section>
      </div>

      {/* SECTION 1: Why Hemovida? */}
      <section className="premium-section">
        <div className="container-premium">
          <div className="section-header">
            <h2>¿Por qué elegir Hemovida?</h2>
            <p>Nos esforzamos por superar los estándares de salud, brindando una experiencia médica premium centrada en ti.</p>
          </div>
          <div className="why-grid">
            {whyHemovida.map((item, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon-wrapper">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Featured Specialties */}
<section className="premium-section bg-soft">
  <div className="container-premium">

    <div className="section-header">
      <h2>Especialidades Destacadas</h2>
      <p>
        Contamos con un equipo multidisciplinario altamente
        calificado para tu bienestar integral.
      </p>
    </div>

    <div
      className="specialties-slider"
      ref={sliderRef}
    >
      {featuredSpecialties.map((spec, idx) => (
        <div
          key={idx}
          className="specialty-slide"
          onClick={() => navigate("/home/categorias")}
        >
          <img
            src={spec.image}
            alt={spec.title}
            className="specialty-slide-image"
          />

          <div className="specialty-slide-overlay">
            <h3>{spec.title}</h3>

            <p>{spec.desc}</p>

            <Link
              to="/home/categorias"
              className="specialty-slide-btn"
            >
              Ver Especialidad →
            </Link>
          </div>
        </div>
      ))}
    </div>

    {/* CONTROLES ABAJO ESTILO VOZANDES */}

    <div className="specialties-navigation">

      <button
        className="slider-btn"
        onClick={scrollLeft}
      >
        ←
      </button>

     <div className="slider-progress">

  <div
    className="slider-progress-fill"
    style={{
      transform: `translateX(${progress * 5.7}px)`
    }}
  />

</div>
      <button
        className="slider-btn"
        onClick={scrollRight}
      >
        →
      </button>

    </div>

  </div>
</section>

{/* SECTION 3: Experiencia Hemovida */}
<section className="hemovida-experience">

  <div className="experience-content">

    <div className="experience-left">

      <span className="experience-tag">
        CLÍNICA HEMOVIDA
      </span>

      <h2>
        Cuidamos tu salud en
        <span> cada etapa de tu vida</span>
      </h2>

      <p>
        Nuestro compromiso es brindarte una atención médica
        humana, segura y especializada, acompañándote en cada
        momento con tecnología avanzada y profesionales de
        excelencia.
      </p>

      <button
        className="experience-btn"
        onClick={() => navigate("/home/nosotros")}
      >
        Conoce Más →
      </button>

    </div>

    <div className="experience-right">

  <div className="ecg-background">

    <svg
      viewBox="0 0 1200 300"
      xmlns="http://www.w3.org/2000/svg"
    >

      <defs>

        <linearGradient
          id="ecgGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#00d4ff" />
<stop offset="50%" stopColor="#2563eb" />
<stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

      </defs>

      <path
        d="
          M0 150
          L120 150
          L170 150
          L210 80
          L250 250
          L300 40
          L350 150
          L500 150
          L560 150
          L620 90
          L680 220
          L740 60
          L800 150
          L1200 150
        "
        fill="none"
        stroke="url(#ecgGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

    </svg>

  </div>

  <div className="circle circle-big">
    <img src="/images/hemovida/paciente1.jpeg" alt="" />
  </div>

  <div className="circle circle-medium">
    <img src="/images/hemovida/paciente4.jpg" alt="" />
  </div>

  <div className="circle circle-small">
    <img src="/images/hemovida/paciente5.jpg" alt="" />
  </div>

</div>
  </div>

</section>
      
      {/* SECTION 4: Featured Doctors */}
      <section className="premium-section">
        <div className="container-premium">
          <div className="section-header">
            <h2>Nuestros Médicos</h2>
            <p>Conoce a los profesionales que lideran el cuidado de tu salud en Hemovida.</p>
          </div>
          <div className="doctors-grid">
            {doctors.map((doc, idx) => (
              <div key={idx} className="doctor-card-premium">
                <div className="doc-image-wrapper">
                  <img src={doc.img} alt={doc.name} />
                </div>
                <div className="doc-info">
                  <span className="doc-spec">{doc.spec}</span>
                  <h3>{doc.name}</h3>
                  <p className="doc-exp">{doc.exp}</p>
                  <button className="btn-profile">Ver Perfil Profesional</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Testimonials */}
      <section className="premium-section testimonials-section">
        <div className="container-premium">
          <div className="section-header">
            <h2>Voces de Nuestros Pacientes</h2>
            <p>La confianza de nuestros pacientes es nuestra mayor recompensa.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"La atención en Hemovida superó mis expectativas. Desde que entras notas el profesionalismo y la calidez humana de todo el personal."</p>
              <div className="testimonial-user">
                <div className="user-avatar">JP</div>
                <div className="user-info">
                  <h4>Juan Pérez</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Cuentan con tecnología de punta que me dio mucha seguridad para mi cirugía. El seguimiento post-operatorio fue impecable."</p>
              <div className="testimonial-user">
                <div className="user-avatar">MA</div>
                <div className="user-info">
                  <h4>María Andrade</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: News and Updates */}
      <section className="premium-section">
        <div className="container-premium">
          <div className="section-header">
            <h2>Noticias y Novedades</h2>
            <p>Mantente informado sobre nuestras campañas, promociones y artículos de salud.</p>
          </div>
          <div className="news-grid">
            <div className="news-card">
              <div className="news-image" style={{ background: "linear-gradient(45deg, #10c7c4, #2441b8)" }}></div>
              <div className="news-content">
                <span className="news-tag">Campaña</span>
                <h3>Mes del Corazón: Chequeos preventivos con 20% de descuento</h3>
                <p>Durante todo este mes, únete a nuestra campaña de prevención cardiovascular.</p>
                <Link to="#" className="news-link">Leer más →</Link>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image" style={{ background: "linear-gradient(45deg, #6844c5, #2441b8)" }}></div>
              <div className="news-content">
                <span className="news-tag">Tecnología</span>
                <h3>Inauguramos nuestra nueva Sala de Tomografía 3D</h3>
                <p>Incorporamos tecnología de última generación para diagnósticos más rápidos y precisos.</p>
                <Link to="#" className="news-link">Leer más →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA Final */}
      <section className="cta-premium">
        <div className="container-premium">
          <div className="cta-box">
            <h2>Agenda tu cita hoy mismo</h2>
            <p>No postergues tu salud. Nuestro equipo de especialistas está listo para brindarte la mejor atención que te mereces.</p>
            <div className="cta-buttons">
              <Link to="/home/products" className="btn-cta-primary">Reservar Cita Ahora</Link>
              <Link to="/home/contact" className="btn-cta-secondary">Contactar Clínica</Link>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
    </div>
  );
};