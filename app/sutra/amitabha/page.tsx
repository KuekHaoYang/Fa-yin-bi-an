"use client";

import { useEffect, useState } from 'react';

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const closest = visibleEntries.reduce((prev, curr) => {
            const prevBound = prev.boundingClientRect;
            const currBound = curr.boundingClientRect;
            return Math.abs(prevBound.top) < Math.abs(currBound.top) ? prev : curr;
          });
          setActiveSection(closest.target.id);
        }
      },
      {
        rootMargin: '-10% 0px -85% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );

    document.querySelectorAll('h2').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const sections = [
    "经题大意",
    "说法场景",
    "极乐世界",
    "庄严妙音",
    "佛德无量",
    "往生法门",
    "流通分"
  ];

  const MenuButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="fixed left-4 bottom-4 z-50 bg-amber-100 text-[#8B4513] p-3 rounded-full shadow-lg hover:bg-amber-200 transition-colors duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );

  return (
    <>
      <MenuButton />
      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed left-4 bottom-20 w-64 bg-white/95 p-4 rounded-lg shadow-lg backdrop-blur-sm border border-amber-100 max-h-[70vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-[#8B4513] border-b border-amber-200 pb-2">目录</h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`text-left w-full px-2 py-1 rounded text-sm hover:bg-amber-50 transition-colors duration-200
                      ${activeSection === section ? 'text-[#8B4513] font-bold bg-amber-50' : 'text-[#4A3728]'}`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-20">
    <h2 id={title} className="text-3xl font-bold mb-8 text-[#8B4513] text-center border-b-2 border-[#8B4513] pb-4 max-w-2xl mx-auto scroll-mt-32">{title}</h2>
    <div className="space-y-8">{children}</div>
  </div>
);

export default function Sutra() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F5F5DC, #FFF8DC)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-20 text-[#8B4513] tracking-wider relative">
          如来诸经
          <div className="absolute w-32 h-1 bg-amber-400 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </h1>

        <TableOfContents />

        <div className="space-y-24">
          <Section title="经题大意">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">经题译者</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">佛说阿弥陀经原文与白话----姚秦三藏法师鸠摩罗什译</p>
                  <p>鸠摩罗什（344年-413年），是东晋十六国时期著名的佛经翻译家。他精通汉语，翻译的经典文字优美流畅，被誉为"四大译经家"之一。他翻译的《阿弥陀经》成为净土宗最重要的经典之一。</p>
                </div>
              </div>

              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">如是我闻</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">如是我闻。</p>
                  <p>这部经是我阿难亲自听佛陀宣讲的。"如是我闻"是一切经典开头的第一句话，表示这是佛陀的真实教法。这四字是佛灭度后，阿难尊者结集经藏时，遵照佛陀的遗命加在一切经首的。</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">经题含义</h4>
              <div className="space-y-4 text-lg text-[#4A3728]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-[#8B4513] mb-3">经题解释</h5>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>佛说：表明此经是释迦牟尼佛亲口所说</li>
                      <li>阿弥陀：梵语音译，意为"无量光"和"无量寿"</li>
                      <li>经：即契经，契理契机之教法</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#8B4513] mb-3">译者介绍</h5>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>姚秦：指后秦时期，姚兴在位时</li>
                      <li>三藏：经藏、律藏、论藏皆通达</li>
                      <li>法师：精通佛法，为人师表</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 bg-amber-50/50 p-4 rounded-lg">
                  <p className="text-[#4A3728]">此经是净土三经之一，为净土宗重要经典。经中详细描述了西方极乐世界的庄严和往生的方法，是修学净土法门的根本经典。"如是我闻"四字，代表此经是佛陀真实教法的证明。</p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="说法场景">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-6 text-lg leading-relaxed text-[#4A3728]">
                  <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                    <p className="mb-4">一时佛在舍卫国。祇树给孤独园。与大比丘僧。千二百五十人俱。皆是大阿罗汉。众所知识。长老舍利弗。摩诃目犍连。摩诃迦叶。摩诃迦旃延。摩诃俱絺罗。离婆多。周利槃陀伽。难陀。阿难陀。罗侯罗。憍梵波提。宾头卢颇罗堕。迦留陀夷。摩诃劫宾那。薄拘罗。阿那楼陀。如是等诸大弟子。并诸菩萨摩诃萨。文殊师利法王子。阿逸多菩萨。乾陀诃提菩萨。常精进菩萨。与如是等诸大菩萨。及释提桓因等。无量诸天大众俱。</p>
                    <p>有一天，释迦牟尼佛在舍卫国，祇树给孤独园里说法，在场的有佛陀的常随弟子出家众一千两百五十人。这一千两百五十人都是大阿罗汉，德行高尚，为众人所熟知的。这些人包括了：长老舍利弗、摩诃目犍连、摩诃迦叶、摩诃迦旃延、摩诃俱絺罗、离婆多、周利槃陀伽、难陀、阿难陀、罗侯罗、憍梵波提、宾头卢颇罗堕、迦留陀夷、摩诃劫宾那、薄拘罗、阿菟楼驮等佛陀的大弟子。此外，还有文殊师利菩萨、阿逸多菩萨、乾陀诃提菩萨、常精进菩萨等许多大菩萨；另外还有释提桓因等无数的天人都在场听法。</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="极乐世界">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-6 text-lg leading-relaxed text-[#4A3728]">
                  <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                    <p className="mb-4">尔时。佛告长老舍利弗。从是西方。过十万亿佛土有世界名曰极乐。其土有佛。号阿弥陀。今现在说法。舍利弗。彼土何故名为极乐。其国众生。无有众苦。但受诸乐。故名极乐。</p>
                    <p>这时，佛陀告诉长老舍利弗说：在这世界的西方，越过十万亿个有一个世界叫做极乐国。那里有一尊佛叫阿弥陀佛，现在正在说法。舍利弗，你知道那地方为什么叫极乐国吗？因为那里的众生只有快乐而没有众苦，所以叫做极乐。</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="庄严妙音">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">七重庄严</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">又舍利弗。极乐国土。七重栏楯。七重罗网。七重行树。皆是四宝。周匝围绕。是故彼国名为极乐。</p>
                  <p>舍利弗，我再告诉你极乐国的周围有七道栅栏，空中有七层罗网，地上有七重排列整齐的树木；四面八方都是珍宝围绕，所以叫做极乐。</p>
                </div>
              </div>

              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">七宝池</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">又舍利弗。极乐国土。有七宝池。八功德水。充满其中。池底纯以金沙布地。四边阶道。金银。琉璃。玻璃合成。上有楼阁。亦以金银。琉璃。玻璃。砗磲。赤珠。玛瑙而严饰之。池中莲花大如车轮。青色。青光。黄色。黄光。赤色。赤光。白色。白光。微妙香洁。舍利弗。极乐国土。成就如是功德庄严。</p>
                  <p>舍利弗，我再告诉你，极乐国有七宝池（1），池里充满了八功德水（2）；池底满铺着金沙。池四边的阶道都是用金、银、琉璃、玻璃砌合而成。上面还有楼阁，也都是金流银耀，玉阶琼壁，更有琉璃砗磲，赤珠玛瑙，装饰着宝殿瑶宫，真有说不出的庄严华丽。池中的莲花开得同车轮一般大，色泽有青的、黄的、红的、也有白的；各自放出同色的光彩，微妙香洁。舍利弗，极乐国这地方成就了如上所说的功德庄严。</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">天乐飘香</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">又舍利弗。极乐国土。常作天乐。黄金为地。昼夜六时。雨天曼陀罗华。其土众生。常以清旦。各以衣祴。盛众妙华。供养他方十万亿佛。即以食时。还到本国。饭食经行。</p>
                  <p>舍利弗，我再告诉你，极乐国土常常奏着天上的音乐，地面都是黄金铺成的。每天昼夜六时都有天上的曼陀罗花（3）纷纷而下。那里的众生每天清晨都用自己的衣襟盛着各种美妙的鲜花，去供养他方世界的十万亿佛。到了吃饭的时候，他们就回到本国用斋、经行。</p>
                </div>
              </div>

              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">妙音说法</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">舍利弗。极乐国土。有如是等功德庄严。又舍利弗。彼国常有种种奇妙。杂色之鸟。白鹤。孔雀。鹦鹉。舍利。迦陵频伽。共命之鸟。是诸众鸟。昼夜六时。出和雅音。其音演畅。五根。五力。七菩提分。八圣道分。如是等法。其土众生。闻是音已。皆悉念佛。念法。念僧。</p>
                  <p>舍利弗，极乐国土有如上所说的功德庄严。舍利弗，那个国土里常有各种奇妙的杂色鸟：白鹤、孔雀、鹦鹉、舍利、迦陵频伽、共命之鸟。这些鸟儿在昼夜六时中发出和雅的声音。它们的声音演说着五根、五力、七菩提分、八圣道分等佛法。那里的众生听到这些声音后，都会念佛、念法、念僧。</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">微风法音</h4>
              <div className="space-y-4 text-lg text-[#4A3728]">
                <p className="mb-4">舍利弗。彼佛国土。微风吹动。诸宝行树。及宝罗网。出微妙音。譬如百千种乐。同时俱作。闻是音者。自然皆生。念佛。念法。念僧之心。舍利弗。其佛国土。成就如是功德庄严。</p>
                <p>舍利弗，那佛国土里微风吹动宝树和宝网时，会发出微妙的声音，就像百千种乐器同时演奏一样。听到这些声音的人，自然而然地就会生起念佛、念法、念僧的心。舍利弗，那佛国土成就了如上所说的功德庄严。</p>
              </div>
            </div>
          </Section>

          <Section title="佛德无量">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">名号由来</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">舍利弗。于汝意云何。彼佛何故号阿弥陀。舍利弗。彼佛光明无量。照十方国。无所障碍。是故号为阿弥陀。又舍利弗。彼佛寿命。及其人民。无量无边阿僧祇劫。故名阿弥陀。</p>
                  <p>舍利弗，你知道为什么那尊佛叫做阿弥陀佛吗？舍利弗，因为那尊佛的光明无量无边，能照耀十方世界而没有任何障碍，所以叫做阿弥陀。还有，舍利弗，那尊佛的寿命和他国土中的人民的寿命都是无量无边阿僧祇劫（4），所以叫做阿弥陀。</p>
                </div>
              </div>

              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">十劫成佛</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">舍利弗。阿弥陀佛。成佛以来。于今十劫。又舍利弗。彼佛有无量无边声闻弟子。皆阿罗汉。非是算数之所能知。诸菩萨众。亦复如是。舍利弗。彼佛国土。成就如是功德庄严。</p>
                  <p>舍利弗，阿弥陀佛成佛到现在已经有十劫了。舍利弗，那尊佛有无量无边的声闻弟子，都是阿罗汉，数量之多不是用算数能够计算得出的。诸菩萨众的数量也是如此。舍利弗，那佛国土成就了如上所说的功德庄严。</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">阿鞞跋致</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">又舍利弗。极乐国土。众生生者。皆是阿鞞跋致。其中多有一生补处。其数甚多。非是算数所能知之。但可以无量无边阿僧祇说。</p>
                  <p>还有，舍利弗，生在极乐国土的众生都是阿鞞跋致（5），其中有很多是一生补处菩萨（6）。这些菩萨的数量非常多，不是用算数能够计算得出的，只能说是无量无边阿僧祇那么多。</p>
                </div>
              </div>

              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">诸佛护念</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">舍利弗。如我今者。称赞诸佛不可思议功德。彼诸佛等。亦称赞我不可思议功德。而作是言。释迦牟尼佛。能为甚难希有之事。能于娑婆国土。五浊恶世。劫浊。见浊。烦恼浊。众生浊。命浊中。得阿耨多罗三藐三菩提。为诸众生。说是一切世间难信之法。</p>
                  <p>舍利弗，就像我现在称赞诸佛不可思议的功德一样，那些佛也称赞我不可思议的功德，说道："释迦牟尼佛能做非常困难稀有的事情，能在娑婆世界五浊恶世——劫浊、见浊、烦恼浊、众生浊、命浊之中，证得无上正等正觉，为众生说这一切世间难以相信的法。"</p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="往生法门">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-6 text-lg leading-relaxed text-[#4A3728]">
                  <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                    <p className="mb-4">舍利弗。不可以少善根福德因缘。得生彼国。舍利弗。若有善男子善女人。闻说阿弥陀佛。执持名号。若一日。若二日。若三日。若四日。若五日。若六日。若七日。一心不乱。其人临命终时。阿弥陀佛。与诸圣众。现在其前。是人终时。心不颠倒。即得往生阿弥陀佛极乐国土。</p>
                    <p>舍利弗，不能以少许善根福德因缘，就能往生到那个国土。舍利弗，如果有善男子、善女人，听说阿弥陀佛，执持名号，或一日、或二日、或三日、或四日、或五日、或六日、或七日，一心不乱。这个人临终时，阿弥陀佛与诸圣众，会出现在他面前。这个人临终时，心不颠倒，就能往生到阿弥陀佛的极乐国土。</p>
                  </div>

                  <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                    <p className="mb-4">舍利弗。我见是利。故说此言。若有众生。闻是说者。应当发愿。生彼国土。</p>
                    <p>舍利弗，我看到这个利益，所以说这些话。如果有众生听到这些话，应当发愿往生到那个国土。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">六方诸佛称赞</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-[#8B4513] mb-3">东方诸佛</h5>
                  <p className="text-lg text-[#4A3728]">阿閦鞞佛、须弥相佛、大须弥佛、须弥光佛、妙音佛等</p>
                </div>
                <div>
                  <h5 className="font-semibold text-[#8B4513] mb-3">南方诸佛</h5>
                  <p className="text-lg text-[#4A3728]">日月灯佛、名闻光佛、大焰肩佛、须弥灯佛、无量精进佛等</p>
                </div>
                <div>
                  <h5 className="font-semibold text-[#8B4513] mb-3">西方诸佛</h5>
                  <p className="text-lg text-[#4A3728]">无量寿佛、无量相佛、无量幢佛、大光佛、大明佛、宝相佛、净光佛等</p>
                </div>
                <div>
                  <h5 className="font-semibold text-[#8B4513] mb-3">北方诸佛</h5>
                  <p className="text-lg text-[#4A3728]">焰肩佛、最胜音佛、难沮佛、日生佛、网明佛等</p>
                </div>
                <div>
                  <h5 className="font-semibold text-[#8B4513] mb-3">下方诸佛</h5>
                  <p className="text-lg text-[#4A3728]">师子佛、名闻佛、名光佛、达摩佛、法幢佛、持法佛等</p>
                </div>
                <div>
                  <h5 className="font-semibold text-[#8B4513] mb-3">上方诸佛</h5>
                  <p className="text-lg text-[#4A3728]">梵音佛、宿王佛、香上佛、香光佛、大焰肩佛、杂色宝华严身佛等</p>
                </div>
              </div>
              <div className="mt-6 bg-amber-50/50 p-4 rounded-lg">
                <p className="text-[#4A3728]">这些诸佛各于其国，出广长舌相，遍覆三千大千世界，说诚实言："汝等众生，当信是称赞不可思议功德、一切诸佛所护念经。"</p>
              </div>
            </div>
          </Section>

          <Section title="流通分">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">难信之法</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">舍利弗。当知我于五浊恶世。行此难事。得阿耨多罗三藐三菩提。为一切世间说此难信之法。是为甚难。</p>
                  <p>舍利弗，你应当知道我在五浊恶世，做这困难的事情，证得无上正等正觉，为一切世间说这难以相信的法，这是非常困难的。</p>
                </div>
              </div>

              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">经名</h4>
                <div className="space-y-4 text-lg text-[#4A3728]">
                  <p className="mb-4">佛说此经已。舍利弗。及诸比丘。一切世间天人阿修罗等。闻佛所说。欢喜信受。作礼而去。</p>
                  <p>佛说完这部经后，舍利弗和诸比丘，以及一切世间的天人、阿修罗等，听了佛所说的，都欢喜信受，礼拜后离去。</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">注解</h4>
              <div className="space-y-4 text-lg text-[#4A3728]">
                <p>¹七宝池：用七种珍宝所造的水池。</p>
                <p>²八功德水：具有八种功德的水：澄清、清冷、甘美、轻软、润泽、安和、除饥渴、长养诸根。</p>
                <p>³曼陀罗花：梵语意译为"适意"，是一种香花。</p>
                <p>⁴阿僧祇劫：梵语意译为"无数劫"，形容时间长远。</p>
                <p>⁵阿鞞跋致：梵语意译为"不退转"，指修行永不退转。</p>
                <p>⁶一生补处：修行到最后一生就能成佛的菩萨。</p>
                <p>⁷五浊恶世：指充满五种浊恶的世间：劫浊、见浊、烦恼浊、众生浊、命浊。</p>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
} 