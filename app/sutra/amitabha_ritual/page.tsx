"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import amidaImage from '/public/Amida_Coming_Over_The_Mountain.jpg'; 

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
    "阿弥陀经规仪"
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

export default function AmitabhaRitual() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F5F5DC, #FFF8DC)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-20 text-[#8B4513] tracking-wider relative">
          阿弥陀经规仪
          <div className="absolute w-32 h-1 bg-amber-400 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </h1>

        <TableOfContents />

        <div className="text-center mb-10">
        <Image
            src={amidaImage}
            alt="阿弥陀佛与诸菩萨圣众接引图"
            width={600}
            height={400}
             className="mx-auto rounded-lg shadow-md mb-4"
        />
        <p className="text-sm text-[#4A3728] italic">阿弥陀佛与诸菩萨圣众接引图</p>
        </div>
        
        <div className="space-y-24">
          <Section title="阿弥陀经规仪">
            <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none text-lg leading-relaxed text-[#4A3728] text-center">
                (莲池赞)(合掌)<br />
                莲池海会。弥陀如来。<br />
                观音势至坐莲台。接引上金阶。<br />
                大誓弘开。普愿离尘埃。<br />
                南无莲池会菩萨摩诃萨（三称三拜）<br /><br />

                (开经偈)<br />
                无上甚深微妙法 百千万劫难遭遇<br />
                我今见闻得受持 愿解如来真实义<br /><br />

                南无莲池海会佛菩萨（三称）<br /><br />

                (佛说阿弥陀经)<br />
                如是我闻。一时佛在舍卫国，祇树给孤独园。与大比丘僧，千二百五十人俱，皆是大阿罗汉，众所知识：长老舍利弗、摩诃目犍连、摩诃迦叶、摩诃迦旃延、摩诃俱絺罗、离婆多、周利槃陀伽、难陀、阿难陀、罗睺罗、憍梵波提、宾头卢颇罗堕、迦留陀夷、摩诃劫宾那、薄拘罗、阿那律陀，如是等诸大弟子。并诸菩萨摩诃萨：文殊师利法王子、阿逸多菩萨、乾陀诃提菩萨、常精进菩萨，如是等诸大菩萨。及释提桓因等，无量诸天大众俱。（放掌）<br /><br />

                尔时，佛告长老舍利弗，从是西方，过十万亿佛土，有世界名曰极乐，其土有佛，号阿弥陀，今现在说法。舍利弗，彼土何故名为极乐？其国众生，无有众苦，但受诸乐，故名极乐。<br />

                又舍利弗。极乐国土，七重栏楯，七重罗网，七重行树，皆是四宝周匝围绕，是故彼国名为极乐。又舍利弗。极乐国土，有七宝池，八功德水，充满其中，池底纯以金沙布地。四边阶道，金、银、琉璃、玻璃合成。上有楼阁，亦以金、银、琉璃、玻璃、砗磲、赤珠、玛瑙而严饰之。池中莲花大如车轮，青色青光、黄色黄光、赤色赤光、白色白光，微妙香洁。舍利弗。极乐国土，成就如是功德庄严。又舍利弗。彼佛国土，常作天乐。黄金为地。昼夜六时，雨天曼陀罗华。其土众生，常以清旦，各以衣盛众妙华，供养他方十万亿佛，即以食时，还到本国，饭食经行。舍利弗。极乐国土，成就如是功德庄严。<br /><br />

                复次舍利弗：彼国常有种种奇妙杂色之鸟：白鹤、孔雀、鹦鹉、舍利、迦陵频伽、共命之鸟。是诸众鸟，昼夜六时，出和雅音。其音演畅五根、五力、七菩提分、八圣道分，如是等法。其土众生，闻是音已，皆悉念佛、念法、念僧。舍利弗。汝勿谓此鸟，实是罪报所生，皆是阿弥陀佛，欲令法音宣流，变化所作。舍利弗。彼佛国土，微风吹动诸宝行树，及宝罗网，出微妙音，譬如百千种乐，同时俱作。闻是音者，自然皆生念佛、念法、念僧之心。舍利弗。其佛国土，成就如是功德庄严。<br /><br />

                舍利弗。于汝意云何？彼佛何故号阿弥陀？舍利弗。彼佛光明无量，照十方国，无所障碍，是故号为阿弥陀。又舍利弗。彼佛寿命，及其人民，无量无边阿僧祇劫，故名阿弥陀。舍利弗。阿弥陀佛成佛已来，于今十劫。又舍利弗。彼佛有无量无边声闻弟子，皆阿罗汉，非是算数之所能知。诸菩萨众，亦复如是。舍利弗。彼佛国土，成就如是功德庄严。又舍利弗。极乐国土，众生生者，皆是阿鞞跋致，其中多有一生补处，其数甚多，非是算数所能知之，但可以无量无边阿僧祇说。舍利弗。众生闻者，应当发愿，愿生彼国，所以者何？得与如是诸上善人俱会一处。<br /><br />

                舍利弗。不可以少善根福德因缘，得生彼国。舍利弗。若有善男子善女人，闻说阿弥陀佛，执持名号，若一日、若二日，若三日，若四日，若五日，若六日，若七日，一心不乱，其人临命终时，阿弥陀佛，与诸圣众，现在其前。是人终时，心不颠倒，即得往生阿弥陀佛极乐国土。舍利弗。我见是利，故说此言。若有众生，闻是说者，应当发愿，生彼国土。舍利弗。如我今者，赞叹阿弥陀佛，不可思议功德之利。<br /><br />

                (合掌) 东方亦有阿閦鞞佛、须弥相佛、大须弥佛、须弥光佛、妙音佛，如是等恒河沙数诸佛，各于其国，出广长舌相，遍覆三千大千世界，说诚实言：汝等众生，当信是称赞不可思议功德一切诸佛所护念经。舍利弗。南方世界，有日月灯佛、名闻光佛、大焰肩佛、须弥灯佛、无量精进佛，如是等恒河沙数诸佛，各于其国，出广长舌相，遍覆三千大千世界，说诚实言：汝等众生，当信是称赞不可思议功德一切诸佛所护念经。舍利弗。西方世界，有无量寿佛、无量相佛、无量幢佛、大光佛、大明佛、宝相佛、净光佛，如是等恒河沙数诸佛，各于其国，出广长舌相，遍覆三千大千世界，说诚实言：汝等众生，当信是称赞不可思议功德一切诸佛所护念经。舍利弗。北方世界，有焰肩佛、最胜音佛、难沮佛、日生佛、网明佛，如是等恒河沙数诸佛，各于其国，出广长舌相，遍覆三千大千世界，说诚实言：汝等众生，当信是称赞不可思议功德一切诸佛所护念经。舍利弗。下方世界，有师子佛、名闻佛、名光佛、达摩佛、法幢佛、持法佛，如是等恒河沙数诸佛，各于其国，出广长舌相，遍覆三千大千世界，说诚实言：汝等众生，当信是称赞不可思议功德一切诸佛所护念经。舍利弗。上方世界，有梵音佛、宿王佛、香上佛、香光佛、大焰肩佛、杂色宝华严身佛、娑罗树王佛、宝华德佛、见一切义佛、如须弥山佛，如是等恒河沙数诸佛，各于其国，出广长舌相，遍覆三千大千世界，说诚实言：汝等众生，当信是称赞不可思议功德一切诸佛所护念经。(放掌)<br /><br />

                舍利弗。于汝意云何？何故名为一切诸佛所护念经？舍利弗。若有善男子、善女人，闻是经受持者，及闻诸佛名者，是诸善男子、善女人，皆为一切诸佛之所护念，皆得不退转于阿耨多罗三藐三菩提。是故舍利弗，汝等皆当信受我语，及诸佛所说。舍利弗。若有人已发愿、今发愿、当发愿，欲生阿弥陀佛国者，是诸人等，皆得不退转于阿耨多罗三藐三菩提，于彼国土，若已生、若今生、若当生。是故舍利弗，诸善男子、善女人，若有信者，应当发愿，生彼国土。<br /><br />

                舍利弗，如我今者，称赞诸佛不可思议功德，彼诸佛等，亦称赞我不可思议功德，而作是言：释迦牟尼佛能为甚难希有之事，能于娑婆国土，五浊恶世，劫浊、见浊、烦恼浊、众生浊、命浊中，得阿耨多罗三藐三菩提。为诸众生，说是一切世间难信之法。舍利弗。当知我于五浊恶世，行此难事，得阿耨多罗三藐三菩提，为一切世间说此难信之法，是为甚难。佛说此经已，舍利弗，及诸比丘，一切世间天人阿修罗等，闻佛所说，欢喜信受，作礼而去。<br />
                佛说阿弥陀经<br /><br />

                (拔一切业障根本得生净土陀罗尼)<br />
                南无阿弥多婆夜。哆他伽多夜。哆地夜他。阿弥利都婆毗。阿弥利哆。<br />
                悉耽婆毗。阿弥利哆。毗迦兰帝。阿弥利哆。毗迦兰多。<br />
                伽弥腻。伽伽那。枳多迦利。娑婆诃(三遍)<br /><br />

                (弥陀大赞)(合掌)<br />
                弥陀佛 大愿王 慈悲喜舍量 眉间常放白毫光 度众生极乐邦 八德池中莲九品<br />
                七宝妙树成行 如来圣号若宣扬 接引往西方 弥陀圣号若称扬 同愿往西方<br /><br />

                (赞佛偈)<br />
                阿弥陀佛身金色 相好光明无等伦<br />
                白毫宛转五须弥 绀目澄清四大海<br />
                光中化佛无数亿 化菩萨众亦无边<br />
                四十八愿度众生 九品咸令登彼岸<br />
                南无西方极乐世界大慈大悲阿弥陀佛<br /><br />

                南无阿弥陀佛（多遍）<br />
                阿弥陀佛（多遍）<br /><br />

                (观三圣号)(跪念)<br />
                南无观世音菩萨 (三遍)<br />
                南无大势至菩萨 (三遍)<br />
                南无清净大海众菩萨 (三遍)<br /><br />

                (发愿往生净土文)<br />
                一心皈命。极乐世界。阿弥陀佛。愿以净光照我。慈誓摄我。我今正念。称如来名。<br />
                为菩提道。求生净土。佛惜本誓。若有众生。欲生我国。至心信乐。乃至十念。<br />
                若不生者。不取正觉。以此念佛因缘。得入如来大誓海中。承佛慈力。众罪消灭。<br />
                善根增长。若临命终。自知时至。身无病苦。心不贪恋。意不颠倒。如入禅定。佛及圣众。<br />
                手执金台来迎接我。于一念顷。生极乐国。华开见佛。即闻佛乘。顿开佛慧。广渡众生。<br />
                满菩提愿。十方三世一切佛。一切菩萨摩诃萨。摩诃般若波罗蜜。<br />
                (起身)<br /><br />

                (三皈依)<br />
                自皈依佛。当愿众生。体解大道。发无上心。(一拜)<br />
                自皈依法。当愿众生。深入经藏。智慧如海。(一拜)<br />
                自皈依僧。当愿众生。统理大众。一切无碍。(一拜)(问讯)<br /><br />

                (回向偈)<br />
                愿生西方净土中。九品莲花为父母。<br />
                花开见佛悟无生。不退菩萨为伴侣。<br /><br />

                愿以此功德。(一拜)<br />
                普及于一切。(一拜)<br />
                我等与众生。(一拜)<br />
                皆共成佛道。(问讯)
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
