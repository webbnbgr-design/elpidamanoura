/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import { 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Users, 
  Briefcase, 
  Gavel, 
  Heart,
  Globe,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'home', label: 'Αρχική' },
  { id: 'lawyer', label: 'Η Δικηγόρος' },
  { id: 'expertise', label: 'Τομείς Δικαίου' },
  { id: 'network', label: 'Πανελλαδικό Δίκτυο' },
  { id: 'social', label: 'Κοινωνική Δράση' },
  { id: 'contact', label: 'Επικοινωνία' }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-brand-secondary/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-brand-primary">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <h1 className="text-2xl font-bold tracking-tight">ΕΛΠΙΔΑ ΣΤ. ΜΑΝΟΥΡΑ</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-sans opacity-70">ΔΙΚΗΓΟΡΙΚΟ ΓΡΑΦΕΙΟ • ΗΡΑΚΛΕΙΟ</p>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm font-medium hover:text-brand-accent transition-colors tracking-wide"
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-brand-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-brand-secondary shadow-xl py-8 px-6 flex flex-col space-y-6 border-t border-brand-primary/5"
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-lg font-serif text-left border-b border-brand-primary/5 pb-2"
              >
                {section.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/minimal-abstract/1920/1080?brightness=0.3" 
            alt="Minimal Background" 
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/50 via-transparent to-brand-secondary"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="h-px w-12 bg-brand-accent"></span>
                <span className="text-brand-accent uppercase tracking-[0.3em] text-xs font-bold font-sans">30 ΧΡΟΝΙΑ ΕΜΠΕΙΡΙΑΣ</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-medium leading-[1.1] mb-8">
                Σταθερή παρουσία δίπλα στον πολίτη απο το <span className="italic text-brand-accent">1994</span>.
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl opacity-80 mb-12">
                Ανταπόκριση, συνέπεια και σεβασμός. Μια ανθρώπινη προσέγγιση στη δικαιοσύνη με έδρα το Ηράκλειο και πανελλαδική εμβέλεια.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-brand-primary text-brand-secondary px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand-accent transition-all flex items-center justify-center group"
                >
                  ΕΠΙΚΟΙΝΩΝΙΑ <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
                <div className="flex flex-col justify-center">
                  <a href="tel:6937007609" className="text-lg font-bold hover:text-brand-accent transition-colors">6937007609</a>
                  <p className="text-xs uppercase tracking-widest opacity-60">Άμεση Εξυπηρέτηση</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us / About Section */}
      <section id="lawyer" className="py-24 bg-white scroll-mt-header text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block p-12 mb-12 border border-brand-accent/20 bg-brand-secondary/30 relative">
              <p className="text-7xl font-serif text-brand-accent italic mb-2">30+</p>
              <p className="text-xs uppercase tracking-widest font-bold">Έτη Αδιάλειπτης Άσκησης</p>
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-brand-accent"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-brand-accent"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-medium mb-8">Ελπίδα Στ. Μανουρά</h2>
            <h3 className="text-brand-accent font-sans uppercase tracking-[0.2em] text-sm font-bold mb-6">ΑΠΟΦΟΙΤΟΣ ΑΠΘ | ΔΙΚΗΓΟΡΟΣ ΠΑΡ' ΑΡΕΙΩ ΠΑΓΩ</h3>
            <div className="space-y-6 text-lg leading-relaxed text-brand-primary opacity-80">
              <p>
                Από το 1994, προσφέρω νομικές υπηρεσίες με επίκεντρο τον άνθρωπο. Πιστεύω στην ειλικρίνεια και στη συνέπεια, μακριά από λογικές εκμετάλλευσης.
              </p>
              <p>
                Η εμπειρία τριών δεκαετιών μου επιτρέπει να χειρίζομαι σύνθετες υποθέσεις με αποφασιστικότητα και στρατηγική σκέψη. Στόχος μου είναι πάντα η ουσιαστική δικαίωση του εντολέα μου.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 max-w-2xl mx-auto">
                <div className="flex flex-col items-center">
                  <Award className="text-brand-accent mb-4" size={32} />
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Εμπιστοσύνη</h4>
                  <p className="text-sm opacity-60">Διαφανείς διαδικασίες και ειλικρινής επικοινωνία.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="text-brand-accent mb-4" size={32} />
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Προσωπική Επαφή</h4>
                  <p className="text-sm opacity-60">Κάθε υπόθεση εξετάζεται εξατομικευμένα.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 bg-brand-secondary scroll-mt-header">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-medium mb-6">Τομείς Εξειδίκευσης</h2>
            <p className="text-lg opacity-60 italic">Στοχευμένες νομικές λύσεις για κάθε ανάγκη.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Briefcase size={32} />, 
                title: 'Εργατικό Δίκαιο', 
                desc: 'Πλήρης κάλυψη σε εργασιακές διαφορές, αποζημιώσεις και εργατικά ατυχήματα. Εξειδίκευση ως Εργατολόγος.' 
              },
              { 
                icon: <FileText size={32} />, 
                title: 'Οικογενειακό Δίκαιο', 
                desc: 'Διαζύγια, επιμέλεια τέκνων, διατροφές και οικογενειακές μεσολαβήσεις με σεβασμό στις ευαίσθητες ισορροπίες.' 
              },
              { 
                icon: <Gavel size={32} />, 
                title: 'Ποινικό Δίκαιο', 
                desc: 'Υπεράσπιση σε κάθε στάδιο της ποινικής διαδικασίας με δυναμισμό και στρατηγικό σχεδιασμό.' 
              },
              { 
                icon: <MapPin size={32} />, 
                title: 'Απαλλοτριώσεις', 
                desc: 'Εξειδικευμένη διαχείριση υποθέσεων απαλλοτριώσεων για την προστασία της ιδιοκτησίας σας.' 
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 group hover:bg-brand-primary hover:text-brand-secondary transition-all duration-500 shadow-sm border border-brand-primary/5"
              >
                <div className="text-brand-accent group-hover:text-brand-accent mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-80">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-white/50 p-8 border border-dashed border-brand-accent/30 text-center rounded-xl">
            <h4 className="flex items-center justify-center font-bold text-brand-accent text-sm uppercase tracking-widest mb-4">
              <Award className="mr-2" size={20} /> ΝΟΜΙΚΗ ΒΟΗΘΕΙΑ (LEGAL AID)
            </h4>
            <p className="text-brand-primary/60 max-w-2xl mx-auto italic">
              Παρέχουμε τη δυνατότητα νομικής βοήθειας (Legal Aid) σε δικαιούχους πολίτες, διασφαλίζοντας την πρόσβαση στη δικαιοσύνη για όλους.
            </p>
          </div>
        </div>
      </section>

      {/* Nationwide Network Section */}
      <section id="network" className="py-24 relative overflow-hidden scroll-mt-header">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <Globe className="text-brand-accent mb-8 mx-auto" size={64} />
            <h2 className="text-4xl md:text-5xl font-medium mb-8 uppercase tracking-tight">Πανελλαδικό Δίκτυο Συνεργατών</h2>
            <p className="text-xl leading-relaxed opacity-80 mb-12 italic">
              Διαθέτουμε ένα εκτεταμένο και αξιόπιστο δίκτυο συνεργατών σε ολόκληρη την ελληνική επικράτεια, επιτρέποντάς μας να χειριζόμαστε υποθέσεις σε κάθε γωνιά της Ελλάδας με την ίδια συνέπεια και αποτελεσματικότητα.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold uppercase tracking-widest opacity-40">
              <span>ΑΘΗΝΑ</span>
              <span>ΘΕΣΣΑΛΟΝΙΚΗ</span>
              <span>ΠΑΤΡΑ</span>
              <span>ΡΟΔΟΣ</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <MapPin size={800} />
        </div>
      </section>

      {/* Social Action Section */}
      <section id="social" className="py-24 bg-brand-primary text-brand-secondary scroll-mt-header">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-brand-accent font-sans uppercase tracking-[0.2em] text-xs font-bold mb-4">ΕΥΘΥΝΗ & ΠΡΟΣΦΟΡΑ</h3>
              <h2 className="text-4xl md:text-5xl font-medium mb-8">Κοινωνική Δράση</h2>
              <p className="text-lg leading-relaxed opacity-70 mb-8">
                Η δικηγορία δεν είναι μόνο επάγγελμα, είναι λειτούργημα. Συμμετέχουμε ενεργά σε κοινωνικές πρωτοβουλίες και στηρίζουμε δράσεις που προάγουν τα ανθρώπινα δικαιώματα και την κοινωνική δικαιοσύνη.
              </p>
              <ul className="space-y-4">
                {[
                  'Δωρεάν ενημέρωση ευπαθών ομάδων',
                  'Συμμετοχή σε εθελοντικά νομικά δίκτυα',
                  'Υποστήριξη τοπικών σωματείων Ηρακλείου'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 opacity-90">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                    <span className="font-serif italic">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://picsum.photos/seed/volunteering/800/600?grayscale" 
                alt="Social Action Abstract" 
                className="w-full h-auto shadow-2xl opacity-80"
                referrerPolicy="no-referrer"
              />
              <Heart className="absolute -top-6 -right-6 text-brand-accent" size={48} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="bg-brand-secondary pt-24 pb-12 scroll-mt-header">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16 mb-16 border-b border-brand-primary/10 pb-16">
            <div>
              <h2 className="text-3xl font-medium mb-8">Επικοινωνία</h2>
              <p className="text-sm opacity-60 mb-8 max-w-xs leading-relaxed italic">
                Είμαστε στη διάθεσή σας για οποιαδήποτε νομική συμβουλή ή εκπροσώπηση. Η έδρα μας βρίσκεται στην καρδιά του Ηρακλείου.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white shadow-sm border border-brand-primary/5">
                  <MapPin size={24} className="text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Διεύθυνση</h4>
                  <p className="text-lg font-serif">Δικαιοσύνης 51, Ηράκλειο Κρήτης</p>
                  <p className="text-xs opacity-50 italic uppercase">Κεντρική Τοποθεσία</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white shadow-sm border border-brand-primary/5">
                  <Phone size={24} className="text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Τηλέφωνα</h4>
                  <p className="text-lg font-serif">
                    <a href="tel:2810221277" className="hover:text-brand-accent transition-colors">2810 221277</a>
                  </p>
                  <p className="text-lg font-serif">
                    <a href="tel:6937007609" className="hover:text-brand-accent transition-colors">6937 007609</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white shadow-sm border border-brand-primary/5">
                  <Mail size={24} className="text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-lg font-serif underline decoration-brand-accent/30 underline-offset-4">
                    <a href="mailto:elpidamanoura@gmail.com" className="hover:text-brand-accent transition-colors">elpidamanoura@gmail.com</a>
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => window.open('https://maps.google.com/?q=Δικαιοσύνης+51+Ηράκλειο', '_blank')}
                className="w-full border border-brand-primary/20 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-brand-secondary transition-all"
              >
                ΟΔΗΓΙΕΣ ΠΡΟΣΒΑΣΗΣ
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] opacity-40">
            <p>© {new Date().getFullYear()} ΔΙΚΗΓΟΡΙΚΟ ΓΡΑΦΕΙΟ ΕΛΠΙΔΑ ΣΤ. ΜΑΝΟΥΡΑ</p>
            <p className="mt-4 md:mt-0 font-serif italic normal-case tracking-[0.05em]">Από το 1994 με συνέπεια και σεβασμό.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
