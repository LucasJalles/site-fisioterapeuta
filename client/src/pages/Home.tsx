import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Menu, X, Phone, Mail, MapPin, Send, Clipboard } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Dados do profissional - CUSTOMIZE AQUI
  const professional = {
    name: "Fabiana Rodrigues",
    title: "Fisioterapeuta",
    phone: "21967092309",
    email: "fabianarb57@gmail.com",
    location: "Saquarema, RJ",
    bio: "Inicie sua avaliação gratuita",
    specialties: [
      "Reabilitação Pós-Cirúrgica",
      "Fisioterapia Desportiva",
      "Terapia Manual",
      "RPG",
    ],
    image: "Fabiana.png", 
  };

  const galleryImages = [
    "Fisio1.jpg",
    "Fisio2.jpg",
    "Fisio3.jpg",
    "Fisio4.jpg",
    "Fisio5.jpg",
    "Fisio6.jpg",
  ];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para enviar o formulário
    console.log("Formulário enviado:", formData);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de agendar uma sessão de fisioterapia."
    );
    window.open(`https://wa.me/${professional.phone}?text=${message}`, "_blank");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">{professional.name}</div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contato
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-blue-600 transition text-left"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-blue-600 transition text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-gray-700 hover:text-blue-600 transition text-left"
              >
                Galeria
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-blue-600 transition text-left"
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {professional.name}
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-4">
                {professional.title}
              </p>
              <p className="text-gray-700 text-lg mb-8">{professional.bio}</p>
              <div className="flex gap-4 flex-wrap">
                <Button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Agendar via WhatsApp
                </Button>
                <Button
                  onClick={() => setLocation("/pre-avaliacao")}
                  variant="outline"
                >
                  Pré-Avaliação
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-gray-300 rounded-lg aspect-square flex items-center justify-center">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x400?text=Foto+Profissional";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Sobre Mim
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Especialidades
              </h3>
              <ul className="space-y-3">
                {professional.specialties.map((specialty, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{professional.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{professional.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{professional.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Galeria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="bg-gray-300 rounded-lg aspect-square overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={image}
                  alt={`Galeria ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://via.placeholder.com/400x400?text=Imagem+${index + 1}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Envie uma Mensagem
          </h2>
          <div className="max-w-2xl mx-auto">
            {formSubmitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Sua mensagem aqui..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{professional.name}</h3>
              <p className="text-gray-400">{professional.title}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato Rápido</h4>
              <div className="space-y-2 text-gray-400">
                <p>{professional.phone}</p>
                <p>{professional.email}</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Localização</h4>
              <p className="text-gray-400">{professional.location}</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} {professional.name}. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
