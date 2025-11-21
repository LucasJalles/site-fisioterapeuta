import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Send, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function PreAssessment() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    painType: "",
    painDuration: "",
    selectedAreas: [] as string[],
    painLevel: "5",
    previousInjuries: "",
    surgeries: "",
    activities: [] as string[],
    medications: "",
    additionalInfo: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Áreas do corpo para seleção
  const bodyAreas = [
    { id: "head", label: "Cabeça/Pescoço" },
    { id: "shoulder", label: "Ombro" },
    { id: "arm", label: "Braço" },
    { id: "elbow", label: "Cotovelo" },
    { id: "wrist", label: "Punho/Mão" },
    { id: "chest", label: "Peito/Costas Altas" },
    { id: "back", label: "Costas" },
    { id: "lower_back", label: "Coluna Lombar" },
    { id: "hip", label: "Quadril" },
    { id: "knee", label: "Joelho" },
    { id: "ankle", label: "Tornozelo/Pé" },
  ];

  // Tipos de limitações
  const activityLimitations = [
    "Dificuldade para levantar",
    "Dificuldade para caminhar",
    "Dificuldade para subir escadas",
    "Dificuldade para dormir",
    "Dificuldade para trabalhar",
    "Dificuldade para dirigir",
    "Dificuldade para atividades domésticas",
    "Dificuldade para exercitar",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAreaToggle = (areaId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAreas: prev.selectedAreas.includes(areaId)
        ? prev.selectedAreas.filter((id) => id !== areaId)
        : [...prev.selectedAreas, areaId],
    }));
  };

  const handleActivityToggle = (activity: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor, preencha nome, email e telefone");
      return;
    }

    if (formData.selectedAreas.length === 0) {
      alert("Por favor, selecione pelo menos uma área de incômodo");
      return;
    }

    // Preparar mensagem para WhatsApp
    const areasText = formData.selectedAreas
      .map(
        (areaId) =>
          bodyAreas.find((a) => a.id === areaId)?.label || areaId
      )
      .join(", ");

    const activitiesText =
      formData.activities.length > 0
        ? formData.activities.join(", ")
        : "Nenhuma selecionada";

    const message = encodeURIComponent(
      `*PRÉ-AVALIAÇÃO FISIOTERAPIA*\n\n` +
        `*Dados Pessoais:*\n` +
        `Nome: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Telefone: ${formData.phone}\n` +
        `Idade: ${formData.age || "Não informado"}\n\n` +
        `*Informações da Dor:*\n` +
        `Áreas de incômodo: ${areasText}\n` +
        `Tipo de dor: ${formData.painType || "Não especificado"}\n` +
        `Duração: ${formData.painDuration || "Não especificado"}\n` +
        `Nível de dor (0-10): ${formData.painLevel}\n\n` +
        `*Histórico Médico:*\n` +
        `Lesões anteriores: ${formData.previousInjuries || "Nenhuma"}\n` +
        `Cirurgias: ${formData.surgeries || "Nenhuma"}\n` +
        `Medicamentos: ${formData.medications || "Nenhum"}\n\n` +
        `*Limitações de Atividades:*\n` +
        `${activitiesText}\n\n` +
        `*Informações Adicionais:*\n` +
        `${formData.additionalInfo || "Nenhuma"}`
    );

    // Número do WhatsApp (substitua pelo número do profissional)
    const whatsappNumber = "21967092309"; 
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLocation("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Pré-Avaliação Fisioterapêutica
          </h1>
          <p className="text-gray-600">
            Preencha este formulário para que possamos entender melhor sua
            situação e preparar uma avaliação mais completa.
          </p>
        </div>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            Obrigado! Seus dados foram enviados via WhatsApp. Entraremos em
            contato em breve!
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
          {/* Seção 1: Dados Pessoais */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Dados Pessoais
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="block mb-2">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="block mb-2">
                    Idade
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Sua idade"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="block mb-2">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="block mb-2">
                    Telefone/WhatsApp *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Seção 2: Áreas de Incômodo */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Onde Você Sente Incômodo? *
            </h2>
            <p className="text-gray-600 mb-4">
              Selecione todas as áreas que incomodam você:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bodyAreas.map((area) => (
                <div key={area.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={area.id}
                    checked={formData.selectedAreas.includes(area.id)}
                    onCheckedChange={() => handleAreaToggle(area.id)}
                  />
                  <Label htmlFor={area.id} className="cursor-pointer">
                    {area.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Seção 3: Tipo e Duração da Dor */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Características da Dor
            </h2>
            <div className="space-y-6">
              <div>
                <Label className="block mb-3 font-semibold">
                  Tipo de Dor:
                </Label>
                <RadioGroup
                  value={formData.painType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      painType: value,
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aguda" id="aguda" />
                    <Label htmlFor="aguda" className="cursor-pointer">
                      Dor Aguda (recente)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cronica" id="cronica" />
                    <Label htmlFor="cronica" className="cursor-pointer">
                      Dor Crônica (há muito tempo)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inflamacao" id="inflamacao" />
                    <Label htmlFor="inflamacao" className="cursor-pointer">
                      Inflamação
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rigidez" id="rigidez" />
                    <Label htmlFor="rigidez" className="cursor-pointer">
                      Rigidez/Limitação de movimento
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="block mb-3 font-semibold">
                  Há quanto tempo sente esse incômodo?
                </Label>
                <RadioGroup
                  value={formData.painDuration}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      painDuration: value,
                    }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="menos_1_semana" id="menos_1_semana" />
                    <Label
                      htmlFor="menos_1_semana"
                      className="cursor-pointer"
                    >
                      Menos de 1 semana
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1_4_semanas" id="1_4_semanas" />
                    <Label htmlFor="1_4_semanas" className="cursor-pointer">
                      1 a 4 semanas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1_3_meses" id="1_3_meses" />
                    <Label htmlFor="1_3_meses" className="cursor-pointer">
                      1 a 3 meses
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mais_3_meses" id="mais_3_meses" />
                    <Label htmlFor="mais_3_meses" className="cursor-pointer">
                      Mais de 3 meses
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="painLevel" className="block mb-3 font-semibold">
                  Intensidade da Dor (0 = sem dor, 10 = dor máxima):
                </Label>
                <div className="flex items-center gap-4">
                  <input
                    id="painLevel"
                    type="range"
                    min="0"
                    max="10"
                    name="painLevel"
                    value={formData.painLevel}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-blue-600 min-w-12">
                    {formData.painLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 4: Histórico Médico */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Histórico Médico
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="previousInjuries" className="block mb-2">
                  Já teve lesões anteriores nessa área?
                </Label>
                <Textarea
                  id="previousInjuries"
                  name="previousInjuries"
                  value={formData.previousInjuries}
                  onChange={handleInputChange}
                  placeholder="Descreva lesões anteriores (opcional)"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="surgeries" className="block mb-2">
                  Já passou por cirurgias?
                </Label>
                <Textarea
                  id="surgeries"
                  name="surgeries"
                  value={formData.surgeries}
                  onChange={handleInputChange}
                  placeholder="Descreva cirurgias (opcional)"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="medications" className="block mb-2">
                  Usa alguma medicação?
                </Label>
                <Textarea
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  placeholder="Liste medicações (opcional)"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Seção 5: Limitações de Atividades */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Limitações de Atividades
            </h2>
            <p className="text-gray-600 mb-4">
              Selecione as atividades que você tem dificuldade em realizar:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activityLimitations.map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox
                    id={activity}
                    checked={formData.activities.includes(activity)}
                    onCheckedChange={() => handleActivityToggle(activity)}
                  />
                  <Label htmlFor={activity} className="cursor-pointer">
                    {activity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Seção 6: Informações Adicionais */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Informações Adicionais
            </h2>
            <Label htmlFor="additionalInfo" className="block mb-2">
              Há algo mais que você gostaria de informar?
            </Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Informações adicionais (opcional)"
              rows={4}
            />
          </div>

          {/* Botão de Envio */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/")}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar via WhatsApp
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
