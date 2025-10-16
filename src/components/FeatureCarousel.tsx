import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import carousel1 from "@/assets/carousel1.png";
import carousel2 from "@/assets/carousel2.png";
import carousel3 from "@/assets/carousel3.png";
import carousel4 from "@/assets/carousel4.png";
import carousel5 from "@/assets/carousel5.png";

const features = [
  {
    image: carousel1,
    title: "Browse or Create Custom Templates",
    description:
      "Tired of using generic templates? With Wapi, you can design custom messaging templates tailored to your business needs. Your brand is unique, your communication should be too.",
  },
  {
    image: carousel2,
    title: "Direct Messaging with Contacts",
    description:
      "Engage with your contacts directly through chat. Build stronger relationships one message at a time.",
  },
  {
    image: carousel3,
    title: "Create & Send Campaigns",
    description:
      "With Wapi, you can design and send effective WhatsApp campaigns with minimal effort. With Wapi, you can design and send effective WhatsApp campaigns with minimal effort.",
  },
  {
    image: carousel4,
    title: "Auto-Reply Bots",
    description:
      "Don't leave customers hanging. Set up auto-reply bots to handle inquiries instantly, even when you're not available.",
  },
  {
    image: carousel5,
    title: "WhatsApp Flows",
    description:
      "Automate your interactions! Use WhatsApp Flows to streamline communication and save time.",
  },
];

export const FeatureCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
      <div className="max-w-xl w-full space-y-6 lg:space-y-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:rounded-2xl shadow-[var(--shadow-medium)]">
          <img
            src={features[currentSlide].image}
            alt={features[currentSlide].title}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        <div className="text-center space-y-3 lg:space-y-4 min-h-[120px] lg:min-h-[140px]">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            {features[currentSlide].title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {features[currentSlide].description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          <div className="flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};
