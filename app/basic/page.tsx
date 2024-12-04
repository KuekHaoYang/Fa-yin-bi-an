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
    "佛教三要素",
    "佛历与佛诞",
    "佛陀的圣号释义",
    "佛陀示现",
    "释迦牟尼佛简史",
    "幼年及少年时代",
    "出家",
    "修行的经过",
    "成道",
    "说法度众生的工作",
    "涅槃",
    "影响世界的真理",
    "八相示现"
  ];

  const MenuButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="fixed right-4 bottom-4 z-50 bg-amber-100 text-[#8B4513] p-3 rounded-full shadow-lg md:hidden hover:bg-amber-200 transition-colors duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );

  return (
    <>
      <MenuButton />
      
      <div className="hidden md:block fixed right-4 top-20 w-48 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-sm border border-amber-100 max-h-[80vh] overflow-y-auto">
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

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed right-4 bottom-16 w-64 bg-white/95 p-4 rounded-lg shadow-lg backdrop-blur-sm border border-amber-100 max-h-[70vh] overflow-y-auto"
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

export default function BasicBuddhism() {

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F5F5DC, #FFF8DC)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-20 text-[#8B4513] tracking-wider relative">
          基础佛法
          <div className="absolute w-32 h-1 bg-amber-400 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </h1>

        <TableOfContents />

        <div className="space-y-24">
          <Section title="佛教三要素">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white/80 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm border border-amber-100">
                <h3 className="text-2xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3 text-center">教主</h3>
                <p className="text-xl text-[#4A3728] text-center">本师释迦牟尼佛</p>
              </div>

              <div className="bg-white/80 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm border border-amber-100">
                <h3 className="text-2xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3 text-center">教理</h3>
                <ul className="list-none space-y-4 text-lg text-[#4A3728]">
                  {[
                    "五戒（人乘）",
                    "十善（天乘）",
                    "四圣谛（声闻乘）",
                    "八正道（三十七道品的主道）",
                    "十二因缘（缘觉乘）",
                    "六度波罗蜜（菩萨乘）",
                    "三法印及一实相印"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-3 text-lg text-[#4A3728] border-t border-amber-200 pt-4">
                  <p>小乘：诸行无常，诸法无我，涅槃寂静法印</p>
                  <p>大乘：一实相印，即诸法缘起性空</p>
                </div>
              </div>

              <div className="bg-white/80 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm border border-amber-100">
                <h3 className="text-2xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3 text-center">教徒</h3>
                <ul className="list-none space-y-4 text-lg text-[#4A3728]">
                  {[
                    "优婆塞（在家皈依守戒学佛男居士）",
                    "优婆夷（在家皈依守戒学女居士）",
                    "式叉摩那（学法女,须学法二年始受戒",
                    "沙弥（未受具足戒之出家男众）",
                    "沙弥尼（未受具足戒之出家女众）",
                    "比丘（出家受具足戒之僧伽）",
                    "比丘尼（出家受具足戒之女尼）"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="佛历与佛诞">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-8">
                  <div className="text-lg leading-relaxed text-[#4A3728]">
                    <p className="mb-6">世界佛教友谊会于公元1950年，在莲华圣地斯里兰卡举行第一次会议，讨论关于佛陀的降生，成道，涅槃年份及出家，成道，涅槃差异史实。因为尚有与北传佛教所记载的，各有差异，故作共同决定如下：</p>
                    <div className="pl-6 space-y-4">
                      {[
                        "佛陀降生于公元前623年的5月月圆日",
                        "佛陀出家时是29岁，成道时是35岁；即公元前588年，5月29日夜半时分觉悟",
                        "佛陀说法45年，80岁涅槃，即公元前543年，5月月圆日夜半时入灭"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-amber-400 mt-2"></span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                    <h4 className="text-xl font-bold mb-4 text-[#8B4513]">佛历计算方法</h4>
                    <div className="space-y-4 text-lg text-[#4A3728]">
                      <p>佛历是由佛陀涅槃时计算起算的。</p>
                      <p>佛历计算方法：即指佛陀生于公元前623年减去寿命80岁，即得543为佛灭度年份（佛涅槃于公元前543年），再将543加公元后1976年，即得2519年。但公元前543加公元后1年，故公元1976年佛陀的佛历是2520年。计算佛历方法，依此类推。</p>
                      <p>试计算佛陀住世到现在有多少年？应将佛陀生时公元前623年，再加公元后1976年，即得2599年，但到今年是庆祝佛诞日，再加一年，已有2600年。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="佛陀的圣号释义">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-6">
                  <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                    <p className="text-lg leading-relaxed text-[#4A3728]">悉达多乔达摩太子成道后，圣号称为释迦牟尼佛。释迦是佛的姓，译名"能仁"，牟尼是佛的名，译义"寂默"。能仁是表示佛陀有慈悲救世，指导无我利他的德行；寂默是说佛陀证悟了宇宙人生的真理，表现他的智慧高深莫测，有自利的功能。</p>
                  </div>
                  
                  <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                    <div className="text-lg leading-relaxed text-[#4A3728] space-y-6">
                      <p>佛：梵语称为佛陀（BUDDHA），意思是觉者，是先知先觉的圣者。这觉悟有义：</p>
                      <div className="pl-6 space-y-2">
                        {["自觉", "觉他", "觉行圆满"].map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            <p>{item}</p>
                          </div>
                        ))}
                      </div>
                      <p>故佛陀是三觉圆满，万德具足的大圣人。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="佛陀示现">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">《过去现在因果经》中关于佛陀降世传法时，有一位善仙仙人，皈依于佛，并获得至高尊荣，以供养佛。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">当时燃灯佛为善仙仙人授记说：“将来成佛，号释迦牟尼元。”有一天，善仙仙人见燃灯佛来，因当地道路是泥路，没有护路的人员，他便脱下外衣，义无反顾地铺在地上，再将头发披散在衣服上，恭敬地迎接燃灯佛的到来。佛祖踏上后，特别表扬道：“子是燃灯佛弟子”意思是说：“将来末世，人此世界中，成佛无疑。”善仙慈悲的修行菩萨行，从此又经历许多时间过去。佛在修行圆满，舍弃色身离开人间，等候投生兜率天。（善德转名为护明）</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">按：兜率天是欲界六天里的第四层天。此天有内外两院：外院为享福报的天人居住，快乐无穷；内院为应该补处，将要继续修行成佛的菩萨所住。菩萨修行圆满，尽此一生，便可成佛，因此又名为一生补处。离开兜率陀天宫殿，往生人间，时在白天，夜沈沙玛。周回观看众生，在肚皮中，对着母亲，说下生人间的微妙偈语。</p>
                <p className="text-lg leading-relaxed text-[#4A3728]">当菩萨从兜率天下降人间时，诸天待从散放光明，菩萨现太子像，口中含四莲花，威神巍巍，于周三出现时，降生人胎，应现于世。这是释迦牟尼佛降世的二种不同的故事。</p>
              </div>
            </div>
          </Section>

          <Section title="释迦牟尼佛简史">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">释迦牟尼佛降生于公元前623年，他的父亲净饭，是迦毗罗卫国的国王，非常英明仁慈，母亲摩耶夫人，是拘利国的公主，为人十分贤慧。她45岁的时候，怀孕太子，已满足了十个月，便在归宁途中，距离国都五英里的蓝毗尼园，诞生了太子，太子能周行七步，脚踏之处，现出七朵莲花；且举目四顾，一手指天，一手指地，自言自语："天上天下，唯我独尊。"传说当时天上飘落香花，还有九龙吐水为太子沐浴。</p>
                <p className="text-lg leading-relaxed text-[#4A3728]">父母晚年得子，喜出望外。当太子回宫后，全国举行欢庆，阿私陀修士来访，说太子相貌庄严，预言将来可以做统一世界的"转轮圣王"，或博学的"一切智者一一佛陀"。父王对他寄予非常殷切的希望，所以特请著名的婆罗门教授，替太子取个名字，叫做"悉达多"，是吉祥及一切功德成就的意思。</p>
              </div>
            </div>
            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">注释</h4>
              <div className="space-y-4 text-lg text-[#4A3728]">
                <p>¹阿私陀: 为信奉婆罗门教之修士，当悉达多太子未降生前，彼在禅定境界中现出天女预备为太子降生时散花之瑞相。</p>
                <p>²转轮圣王: 为世界第一有福之人。有四种福报：</p>
                <ul className="list-none pl-6 space-y-2">
                  {[
                    "大富，珍宝、财物、田宅等众多，为天下第一",
                    "形貌庄严端正，具三十二相",
                    "身体健康无病，安稳快乐",
                    "寿命长远，为天下第一"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="幼年及少年时代">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">悉达多太子诞生七天时，母亲就去世了。姨母摩诃波阇波提，为净饭王继后，抚养太子。她把太子当作亲生儿子一样疼爱，使太子仍旧在幸福舒适中生活长大。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">七岁时，太子开始读书。净饭王聘请名师教他学习梵文，由浅入深的研读五明和四吠陀。聪明的太子，闻一知十，没几年（十二、十三岁时）便博通了一切学问。后来又学兵法与武术，也都很快就精练了。在一次王家子弟的比武会中，他表演了优越的体力角斗，和超人的射箭武艺：诸王子中最好的，只能一箭射穿三鼓，太子却能一箭连穿七鼓。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">十六岁，父亲就让他结婚，娶的是邻国公主耶输陀罗。后来生下一个名叫罗睺罗的儿子。当罗睺罗出生时，太子叹气道："罗睺罗有般奴。"意思是镣铐锁住了父亲的颈项。</p>
                <p className="text-lg leading-relaxed text-[#4A3728]">净饭王很爱太子，希望他承继王位，所以特别为他筑了"寒"、"暑"、"温"三时宫殿，挑选许多宫人美女服侍他，让他过着快乐的生活，但是悉达多太子对这世间的富贵、快乐，却不感到兴趣。</p>
              </div>
            </div>
            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">注释</h4>
              <div className="space-y-4 text-lg text-[#4A3728]">
                <p>³五明：一、语言学的声明；二、工艺学的工巧明；三、医药学的医方明；四、论理学的因明；五、宗教学的内明。</p>
                <p>⁴四吠陀：梵文VEDA，是明智的意思。</p>
                <ul className="list-none pl-6 space-y-2">
                  {[
                    "梨俱吠陀 - 宗教的赞歌",
                    "沙摩吠陀 - 祭祀仪式的颂文",
                    "夜柔吠陀 - 祭祀仪式的歌词",
                    "阿闼婆吠陀 - 俗世相传的咒术"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="出家">
            <div className="space-y-8">
              <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <div className="prose prose-xl max-w-none">
                  <div className="space-y-6 text-lg leading-relaxed text-[#4A3728]">
                    <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                      <p>悉达多太子，是个王子，但他看见当时印度四阶级的不平等待遇，十分不满意。他常常想着："首陀罗为什么做奴隶？难道他们不是人吗？有什么办法，使他们过着自由平等的生活？"</p>
                    </div>
                    
                    <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                      <p>有一次，悉达多太子随着父王，到田野去游玩。看见农夫在耕田，身上没有穿衣服，在猛烈的阳光下晒着，全身是泥浆，大汗直流，气喘不息。耕牛颈上勒着绳子，皮破血流，还要受农夫的鞭打。犁过的泥土，翻出许多小虫，鸟雀飞来争着啄食。太子生起慈悲的同情心，觉得为了求生存，贫民是多么痛苦！而生命界的互相斗争残杀，更是一幕大悲剧！他便在大树下静静地想着："应该怎么样救济他们，让大家过着合理的生活？"太子想得出神，几乎忘记了回宫。</p>
                    </div>
                    
                    <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                      <p>后来他出游四城，遇见老人、病人、死人的痛苦情形，又看出家修士的快乐神情，因此左右思惟，知道任何人也都逃避不了生老病死的痛苦，且一切众生为了求自己的生存，更做出种种罪恶，甚至不懂互相残杀，造成种种悲剧，结果还是向着老、病、死亡的路上走，这悲剧的生命界，这矛盾不合理的人生，应如何去解脱脱离苦呢？这些问题，使太子不能安住于王宫，享受尊荣与富乐，终于在29岁那年的一个月圆光辉夜里，下了最大的决心，抛弃了王位、财富与父母妻妾子，带着侍从从车，骑着犍陡白马，偷偷的离开了王宫，越过了阿耨河，到深山旷野去追求痛苦的解脱与人生的真理。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">注释</h4>
              <div className="space-y-4 text-lg text-[#4A3728]">
                <p>⁵印度四阶级：一、婆罗门；二、刹帝利；三、吠舍；四、首陀罗。</p>
                <p>⁶阿耨河(RIVER ANOMA)是一条小河，经过二千多年泥沙的累积，现在如不下雨，已没有河水。悉达多太子出家离开王宫时经过这河流，沿着这河岸前进，又越过这河水南下访道。</p>
              </div>
            </div>
          </Section>

          <Section title="修行的经过">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">悉达多太子出家以后，在阿耨河河畔，自己剃削掉头发，披起袈裟，叫车匿带了冠服白马回宫，车匿哭泣，白马悲鸣，舍不得离开太子。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">净饭王看见车匿回来了，却看不见太子回来，悲痛万分，立刻派遣大臣去追他回来。但是太子出家的志，非常坚决，对来追的大臣说："我如果我不觉悟真理(成佛)，誓不回宫。"国王无法，只得选了宗族中五个青年，跟随太子修行。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">太子向旷野前进，进入跋伽仙苦行林，看见那些苦行者，祈求生天，而修种种苦行，觉得不是正道，立即要离开，苦行者看见他的道志异常，告诉他到恒河南面的苦行林，定可达到愿望。于是他向南而行，越过恒河南岸，到达摩竭陀国，就在王舍城乞食，之后，走向班荼婆岩去。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">频婆娑罗王知道了，特别班荼婆岩去访问太子，要请他进宫去，供养一切饮食，并要让他做王，赠送给他半个国土和财物，劝他还俗。太子因修道意志坚定，不愿接受，频婆娑罗王非常敬佩，对太子说："你如果成佛，不要忘记度我。"太子说："大王，我一定能如你的心愿。"于是他向王告辞，朝着苦行林的路径，再去寻找名师了</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">太子同五侍从向追求真理的征途前进，访问了当时著名宗教教师阿罗逻迦兰，和郁陀迦罗摩弗；可是他们的学说都不圆满，不能满足太子的希望，便离开他们，向他处寻访。</p>
                <p className="text-lg leading-relaxed text-[#4A3728]">太子在尼连禅河近处的优楼频罗(URUVELA)村苦行，过了六年极其刻苦的生活，日食麻麦，身体消瘦，四肢无力。后来自己知道过的刻苦，并不能获得真理，便放弃了苦行，接受牧牛女苏耶妲(SUJATA)乳糜的供养，恢复了身体的健康。随从的五个人，以为他失了道念，就不再跟他从了。于是太子到尼连禅河去洗澡，把六年来的污秽洗掉，并决定要开辟自己的宗教途径。</p>
              </div>
            </div>
          </Section>

          <Section title="成道">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">释迦太子洗好身体后，渡过尼连禅河，走到迦耶山附近的菩提迦耶，时有割草童子，先在一棵菩提树下，用草铺了一个座位，太子即在所铺草座上面静坐。他发出坚强的誓愿："我不成正觉，誓不起此座。"（佛经称此座为金刚座）</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">过了第七天深夜，传说这时，太子在禅定中出现魔境扰乱，即魔王波旬，派遣魔女来诱惑他，发动魔兵来将威胁他；太子意志坚定，始终不被他所动摇，结果魔王被降伏了。这传说，是说明了太子内心中古代克服情欲与威势的心理过程。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">降魔后，把精神全力集中起来，运用最高的智慧，去思考大地众生的问题。终于在35岁那年（公元前588年5月月圆日夜半），看见明星出现，豁然觉悟一切真理，完成了无上正觉。从此世人就尊称他为佛陀，圣号就是释迦牟尼佛。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">佛陀所觉悟的真理是什么？最重要的是缘起缘灭的理法，宇宙人生是从缘起而起，万法是由因缘和合共依存。例如我们的身体是由父母生育为缘，而生命是自己带来的主力为因，我们是自己过去所做的无明烦恼业力，所以招感这个身体果报，有了果报身体的生，那么老、病、死就不能避免，所以要解脱生老病死的痛苦，只有修道断除根本烦恼的"无明"。</p>
                <p className="text-lg leading-relaxed text-[#4A3728]">当佛陀在菩提树下成道时说："奇哉，奇哉，大地众生，皆有如来智慧德相，但以妄想执着，不能证得。"这是说一切众生皆有佛性，皆可成佛，而不能成佛的原因，是无明烦恼障蔽了佛性。故佛陀的成道，是了悟缘起，断除无明，慧光焕发，佛性显现，内心清净，燃起了真理光芒，照耀人间。</p>
              </div>
            </div>
            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">注释</h4>
              <div className="space-y-4 text-lg text-[#4A3728]">
                <p>⁷佛是觉行圆满的大圣人，已断烦恼，了脱生死轮回。神是鬼道众生，因活在人世时，曾做过忠义于社会国家的，死后被人尊为神，尚未断除烦恼，不得解脱自在，要受生死轮回。</p>
              </div>
            </div>
          </Section>

          <Section title="说法度众生的工作">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">佛陀成道后，就开始说法度众生的工作：最初，到鹿野苑教化憍陈如等五人，他们听佛说四谛法得道后，就成为五比丘。这是教史上最早的僧伽。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">又有波罗奈国，俱梨迦长者的儿子耶舍，和五十个同伴，一齐来跟随佛出家。俱梨迦长者及夫人也都来皈依佛陀，成为最早的优婆塞和优婆夷。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">接着，佛陀独自到迦耶山上，度化三迦叶兄弟，三迦叶是拜火教的领袖，大哥名叫优楼频螺迦叶，有五百徒众，二弟名叫那提迦叶，有二百五十徒众，三弟名叫伽耶迦叶，有二百五十徒众，合共一千徒众集体来出家，大大提高了佛陀的声望。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">佛陀带了三迦叶兄弟，和徒众千人，到摩竭陀国，频婆娑罗王恭敬迎接，虔诚皈依，并且建筑了竹林精舍，献给佛陀与比丘们，这是佛教史上第一座寺院，也是佛陀在古印度南方说法的根据地。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">佛陀在竹林精舍说法，王舍城著名的异教徒，舍利弗和目犍连，也因崇拜佛陀所说的缘起真理，联合他们的徒众二百人，跟随佛出家。舍利弗智慧第一，目犍连神通第一，成为佛陀转法轮的助手。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">不久，有摩竭陀国大富长者的儿子摩诃迦叶，来皈依佛陀，后来佛陀涅槃，他承受了佛陀的遗钵。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">须达多长者，皈依佛陀，在憍萨罗国舍卫城建筑祇园精舍，献给佛陀说法道场，这座寺院的规模比竹林精舍更为宏大。是佛陀在北方说法的根据地。憍萨罗的国王波斯匿和皇后末利夫人，也都来皈依佛陀，成为忠诚护法的佛教徒。</p>
                <p className="text-lg leading-relaxed text-[#4A3728] mb-6">佛陀成道后的第六年，回祖国探望年老的父亲。姨母波阇波提，和阿难陀等几个堂弟及罗睺罗，也信佛，后来都出了家。当净饭王高龄九十三岁那一年，已是病重垂危，佛陀特再回国为父王临终说法，送终扶棺，布施财物，表示孝敬。</p>
                <p className="text-lg leading-relaxed text-[#4A3728]">佛陀是大慈的安慰者与救护者，他把一切人都当作自己的父母儿女一样爱护，替生病的比丘洗涤脓血，替瞎眼比丘穿针缝补。释迦族与拘利族争水，他不辞劳苦，特地远道去替他们调解。毗舍离城疫症流行，佛陀不怕传染，特别进城去安慰病人，教化病人，并且指导他们，国家应有民主的政治方法。佛陀以慈悲无畏的态度，深入民间，去传播中道的真理，凡是他同他接触过的，听他说法过的，无不深受感动，而心地信仰。佛陀的信徒，从国王、后妃、大臣，以至贫民、乞丐、奴隶，应有尽有，遍布社会的每一阶层，这是他提倡慈悲平等，济度众生的伟大表现。</p>
              </div>
            </div>
            <div className="mt-8 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <h4 className="text-xl font-bold mb-6 text-[#8B4513] border-b border-amber-200 pb-3">注释</h4>
              <div className="space-y-4 text-lg text-[#4A3728]">
                <p>⁸优婆塞：近事男，即在家受五戒男居士。</p>
                <p>⁹优婆夷：近事女，即在家受五戒女居士。</p>
                <p>¹⁰迦叶：即苦行。</p>
                <p>¹阿难陀: 华译庆喜，相貌庄严，记忆力很强，侍佛 25 年，多闻第一</p>
              </div>
            </div>
          </Section>

          <Section title="涅槃">
            <div className="space-y-8">
              <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <div className="prose prose-xl max-w-none">
                  <div className="space-y-6 text-lg leading-relaxed text-[#4A3728]">
                    <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                      <p>佛陀说法四十五年，席不暇暖地奔走，足迹踏遍了恒河两岸。佛到了八十岁那年，从摩竭陀国到毗舍离，在毗舍离的大林精舍，作最后一次的教诲。这时，佛陀身体染了疾病，自知将在三个月内涅槃。又渐渐向前走，经过每一个村落，便利休息时间，向村民说法。在波婆村接受金工（金岚铁匠）纯陀的最后供养。病势加重，于是复步行到拘尸那拉城外的娑罗双树林，佛陀就选择娑罗双树林之间，作为他的入灭地方。</p>
                    </div>
                    
                    <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                      <p>佛陀在阿难陀铺好的僧伽梨（大衣）上，右胁卧下时，已经疲惫不堪。当时一位外道名叫须跋陀罗(SUBHADRA)的来求见时，佛陀又抖擞精神向他说法，成为最后度化的弟子。随侍佛陀的阿难陀见佛陀病势沉重，十分难过，佛陀对阿难陀说："别难过，信任自己，紧握真理明灯，在真理中求解脱。"阿难陀三次请佛住世，佛陀回答："万法自归仍旧灭，人人有生必有死，我的肉体怎能永存呢？我这段生命，必须循着自然法则归于寂灭。"阿难陀和阿那律、罗睺罗等几个小阿罗汉弟子都来环绕在佛陀身边，悲伤地哭泣不已。</p>
                    </div>
                    
                    <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                      <p>佛陀说："我有四个问题，请你们好好铭记：</p>
                      <div className="pl-6 space-y-2 mt-4">
                        {[
                          "我涅槃后，应依戒律为师",
                          "我涅槃后，应依四念处安住",
                          "我涅槃后，恶比丘，应默摈置之",
                          "我涅槃后，一切经典首句应安'如是我闻'，尊奉信奉佛的教诲"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            <p>{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                      <p>阿难陀和众多弟子在佛陀身边默默流泪，佛陀很慈悲的安慰他们说："你们不用悲伤，我一生所教说的法已经全部传授了！"又说："一切众生皆有佛性，皆可成佛；即使我没有出世说法，将会有弥勒（公元前543年）佛的出世广度众生，佛法在世间，佛陀和佛法都不会消失的。"</p>
                    </div>
                    
                    <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                      <p>拘尸那罗国王和佛陀众多弟子们，用最隆重的礼节，为佛陀举行了火葬。佛陀的舍利，由八国国王共同建塔供奉。这种舍利塔，一直到现在，还留存在人间。而佛陀一生慈悲救世的精神，永远为人们所景仰与崇拜。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="影响世界的真理">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-6 text-lg leading-relaxed text-[#4A3728]">
                  <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                    <p>佛陀将世间所有的真理，说明指出，指示他们怎样做人，怎样出离做人后的痛苦方法，这就可以叫做"佛法"。</p>
                  </div>
                  
                  <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                    <p>佛陀成道以后，到印度教的中心城市鹿野苑，从鹿野苑又逐渐扩展到古印度的各地，到佛陀八十岁那一年，说法度众生长达四十五年。他涅槃的当年（即佛涅槃后的第九天）由五百大阿罗汉，公推摩诃迦叶为首席，在王舍城外，灵鹫山七叶岩集合编辑经典；先由阿难陀诵出佛陀所说的一切法，由优婆离诵出佛陀所制定的一切戒律。经过大众的许可，完成了第一次的结集。</p>
                  </div>
                  
                  <div className="bg-amber-50/50 p-6 rounded-lg border border-amber-200">
                    <p>后来，又经过几次的集合整理，并且翻译成各种文字，传播到世界各大国家。中国翻译的佛经，是印度梵语到汉语的意译经典。在世界文化上，是极有价值的文献。</p>
                  </div>
                  
                  <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                    <p>佛法的教则，说明了宇宙的真理，人生的意义，和应该做人的规范，使人们在宗教信仰的意志上，过着慈悲为怀，离苦得乐，舍己利人的群体生活行为，特称为佛教徒，含名佛教。佛法是实现在地球上最圆满的真理，是人生所需要崇尚的信仰。人类能研究佛法，弘扬佛法，将可转变娑婆为极乐。</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="八相示现">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: "降兜率", 
                    content: "先在兜率陀天内院，然后降生人间"
                  },
                  { 
                    title: "托胎", 
                    content: "紫磨金色身，口含四茎莲花，降生人胎"
                  },
                  { 
                    title: "出生", 
                    content: "公元前623年5月月圆日，在蓝毗尼园"
                  },
                  { 
                    title: "出家", 
                    content: "二十九岁，见世间无常，追求真理"
                  },
                  { 
                    title: "降魔", 
                    content: "在尼连禅河附近的苦行林，修行六年"
                  },
                  { 
                    title: "成道", 
                    content: "公元前588年5月月圆日夜半"
                  },
                  { 
                    title: "转法轮", 
                    content: "成道后四十五年间说法度众生"
                  },
                  { 
                    title: "涅槃", 
                    content: "八十岁时，在拘尸那罗城郊娑罗双树林"
                  }
                ].map((phase, index) => (
                  <div 
                    key={index} 
                    className="bg-white/80 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-amber-100 hover:bg-amber-50/80"
                  >
                    <h3 className="text-xl font-bold mb-4 text-[#8B4513] border-b border-amber-200 pb-3 text-center">
                      {phase.title}
                    </h3>
                    <p className="text-lg text-[#4A3728] text-center">{phase.content}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-[#8B4513] inline-block border-b-2 border-amber-400 pb-2">
                    时间线
                  </h4>
                </div>
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200"></div>
                  <div className="space-y-8 relative">
                    {[
                      { year: "公元前623年", event: "降生人间" },
                      { year: "公元前594年", event: "托胎" },
                      { year: "公元前594年", event: "出生" },
                      { year: "公元前594年", event: "出家" },
                      { year: "公元前588年", event: "降魔" },
                      { year: "公元前588年", event: "成道" },
                      { year: "公元前588-543年", event: "转法轮" },
                      { year: "公元前543年", event: "涅槃" }
                    ].map((item, index) => (
                      <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <div className="bg-amber-50/80 p-4 rounded-lg shadow-md inline-block">
                            <p className="font-bold text-[#8B4513]">{item.year}</p>
                            <p className="text-[#4A3728]">{item.event}</p>
                          </div>
                        </div>
                        <div className="w-4 h-4 bg-amber-400 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                        <div className="w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
