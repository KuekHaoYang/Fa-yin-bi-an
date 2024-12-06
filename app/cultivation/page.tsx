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

    document.querySelectorAll('h2, h3').forEach((section) => {
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
    {
      title: "五戒、八关斋戒、十善戒简表",
      subsections: [
        "八关斋戒",
        "五戒",
        "十善业道",
        "五戒/八关斋戒"
      ]
    },
    {
      title: "尊法-八关斋戒及五戒及十善业道",
      subsections: [
        "1. 八关斋戒",
        "2. 五戒及十善业道-人天乘正法"
      ]
    },
    {
      title: "隣接事三則",
      subsections: [
        "a) 在慈心之中保持",
        "b) 佛徒尊事尊父",
        "c) 那其实是于你的"
      ]
    }
  ];

  const MenuButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="fixed left-4 bottom-4 z-50 bg-amber-100 text-[#8B4513] p-3 rounded-full shadow-lg hover:bg-amber-200 transition-colors duration-200"
      aria-label="打开目录"
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
            className="fixed left-4 bottom-20 w-80 bg-white/95 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-amber-100 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-6 text-[#8B4513] border-b-2 border-amber-200 pb-3">目录</h3>
            <nav className="space-y-6">
              {sections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <button
                    onClick={() => scrollToSection(section.title)}
                    className={`text-left w-full px-3 py-2 rounded text-base hover:bg-amber-50 transition-colors duration-200
                      ${activeSection === section.title ? 'text-[#8B4513] font-bold bg-amber-50' : 'text-[#4A3728]'}`}
                  >
                    {section.title}
                  </button>
                  <ul className="pl-4 space-y-1">
                    {section.subsections.map((subsection) => (
                      <li key={subsection}>
                        <button
                          onClick={() => scrollToSection(subsection)}
                          className={`text-left w-full px-3 py-1.5 rounded text-sm hover:bg-amber-50/50 transition-colors duration-200
                            ${activeSection === subsection ? 'text-[#8B4513] font-bold bg-amber-50/50' : 'text-[#4A3728]/90'}`}
                        >
                          {subsection}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-24">
    <h2 id={title} className="text-3xl font-bold mb-12 text-[#8B4513] text-center border-b-2 border-[#8B4513] pb-4 max-w-3xl mx-auto scroll-mt-32">{title}</h2>
    <div className="space-y-12">{children}</div>
  </section>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-16">
    <h3 id={title} className="text-2xl font-bold mb-8 text-[#8B4513] border-b border-amber-200 pb-3 scroll-mt-32">{title}</h3>
    <div className="space-y-6">{children}</div>
  </div>
);

export default function Cultivation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-[#FFF8DC]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-24 text-[#8B4513] tracking-wider relative">
          修行大要
          <div className="absolute w-32 h-1 bg-amber-400 bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
        </h1>

        <TableOfContents />

        <div className="space-y-32">
          <Section title="五戒、八关斋戒、十善戒简表">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-12 text-lg leading-relaxed text-[#4A3728]">
                  <SubSection title="八关斋戒">
                    <ul className="list-none space-y-4 pl-6">
                      <li className="flex items-start">
                        <span className="font-bold mr-3">1.</span>
                        <span>不杀生</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">2.</span>
                        <span>不偷盗</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">3.</span>
                        <span>不邪淫</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">4.</span>
                        <span>不妄语</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">5.</span>
                        <span>不饮酒</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">6.</span>
                        <span>不着香花鬘、涂香水、不坐高广卧床，不观听歌舞伎乐</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">7.</span>
                        <span>不睡高广大床榻</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">8.</span>
                        <span>不非时食</span>
                      </li>
                    </ul>
                  </SubSection>

                  <SubSection title="五戒">
                    <div className="bg-amber-50/50 p-6 rounded-lg">
                      <p className="text-center italic">(八关斋戒戒律不邪淫，故不为盗淫)</p>
                    </div>
                  </SubSection>

                  <SubSection title="十善业道">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      <div className="bg-amber-50/50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold mb-4 text-[#8B4513]">身三业戒:</h4>
                        <ul className="list-none space-y-2">
                          <li>不杀生 - 不杀害动物</li>
                          <li>不偷盗 - 不偷盗财物</li>
                          <li>不邪淫 - 不邪淫乱伦</li>
                        </ul>
                      </div>
                      <div className="bg-amber-50/50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold mb-4 text-[#8B4513]">口四业戒:</h4>
                        <ul className="list-none space-y-2">
                          <li>不妄语 - 不欺骗说谎</li>
                          <li>不两舌 - 不搬弄是非</li>
                          <li>不恶口 - 不咒骂恶言</li>
                          <li>不绮语 - 不说花言巧语与无益的言语</li>
                        </ul>
                      </div>
                      <div className="bg-amber-50/50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold mb-4 text-[#8B4513]">意三业戒:</h4>
                        <ul className="list-none space-y-2">
                          <li>不贪 - 不贪爱五欲</li>
                          <li>不嗔 - 不嗔恚暴怒</li>
                          <li>不痴 - 不愚痴无明</li>
                        </ul>
                      </div>
                    </div>
                  </SubSection>

                  <SubSection title="五戒/八关斋戒">
                    <ul className="list-none space-y-4 pl-6">
                      <li className="flex items-start">
                        <span className="font-bold mr-3">1.</span>
                        <span>不杀生</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">2.</span>
                        <span>不偷盗</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">3.</span>
                        <span>不邪淫</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">4.</span>
                        <span>不妄语</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">5.</span>
                        <span>不饮酒</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">6.</span>
                        <span>不着香花鬘、涂香水、不坐高广大卧床、不观听歌舞伎乐</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">7.</span>
                        <span>不睡高广大床榻</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-3">8.</span>
                        <span>不非时食</span>
                      </li>
                    </ul>
                    <div className="mt-8 bg-amber-50/50 p-6 rounded-lg space-y-4">
                      <p>八关斋戒是全部不邪淫，五戒是不淫戒</p>
                      <p>不饮酒戒以上是都五戒，下列的都是八关斋戒</p>
                    </div>
                  </SubSection>
                </div>
              </div>
            </div>
          </Section>

          <Section title="尊法-八关斋戒及五戒及十善业道">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-12 text-lg leading-relaxed text-[#4A3728]">
                  <SubSection title="1. 八关斋戒">
                    <p className="mb-8">八关斋戒，又名八关斋戒。十善戒规定："八戒斋法，是过去世佛法禅加未来，为在家入制出家法。" 可见八关斋戒是应在家菩萨佛戒，使其共同分威力，学习如来戒律的法方便门。八关斋戒是由五戒，再加上三戒，即成八戒：</p>
                    <div className="space-y-6 pl-8">
                      <p>1）不杀生戒—戒杀一切众生，上至诸佛圣人，师父父母，下至诸飞潜动，微细呢，虫，只要是有生命的，都不可以杀害。杀生的方法，有自己杀，或者叫他人去杀害，或者用种种的方法去伤害它，使其痛苦，使它杀害，又都有得到他人去伤害的，内心生起杀害的，都算是为不杀生的戒法。因此，杀害众生的恶意行，必定犯不杀生戒。</p>
                      <p>2）不偷盗戒—戒所有偷窃，上自金银珠宝物品，下至一针一线，一切不属于你的物，不可是你获得的，甚至用欺骗手段中用物品，或是不想要的东西，偷盗，或诈骗等等，都是为不盗盗戒。能做到偷盗的过失，不偷窃取得，皆为不偷盗戒。</p>
                      <p>3）不邪淫戒—戒邪淫，非法的两性，即夫妻不保有淫，是为不淫戒。</p>
                      <p>4）不妄语戒—即禁止说谎话，虚伪口业善戒。</p>
                      <p>5）不饮酒戒—一切禁止饮酒，酒醉时，神志昏昧，会做出杀盗淫等邪恶的事情。</p>
                      <p>6）不香花鬘、涂香、不歌舞倡、不观听、不华鬘、不涂香，不歌舞，不观听，不坐高广卧床，不香花鬘，不观听，不坐高广卧床，不饰衣服(通过华丽的色彩衣服，达到诱他人)，不依此则不算是犯戒的罪过，除非受到法律的规限。</p>
                      <p>7）不非时食戒—戒逾时，不可逾时而吃大午斋的斋饭。</p>
                      <p>8）不非时食戒—不是吃它的时间，不可吃它，即过午不食。</p>
                    </div>
                    <p className="mt-6">以上八戒中，前七项都是属于戒法，第八项是属于斋法，故名八戒斋。这八戒斋，是生死学佛的男女居士，一日一夜依戒持戒之法。</p>
                  </SubSection>

                  <SubSection title="2. 五戒及十善业道-人天乘正法">
                    <div className="space-y-8">
                      <div className="bg-amber-50/50 p-6 rounded-lg">
                        <h4 className="text-xl font-bold mb-4 text-[#8B4513]">概述</h4>
                        <p className="mb-4">佛教分为五乘法教：人乘、天乘、声闻乘、缘觉乘、菩萨乘。但佛法是以人天乘，建于大乘，达佛乘为基础。故人天乘为佛法最原始阶段。</p>
                        <p>以此人天乘为中心，而后结合更高级的法戒子：首为五戒，其次入善正法，能受持五戒的，可保人身不失（不要堕落地狱）。再由五戒扩大，呼十善业道，谓之天乘，能持十善到以上品的，来生享天福地。</p>
                      </div>

                      <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                        <h4 className="text-xl font-bold mb-4 text-[#8B4513] border-b border-amber-200 pb-2">五戒详解</h4>
                        <div className="space-y-4">
                          <p>五戒是由十善所摄，其共同的意义是，它与大乘佛法五戒同处于重尊的地位，而十善是表明心动的念而为。</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <span className="font-bold block mb-2">一、不杀</span>
                              <span className="text-sm">不杀生</span>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <span className="font-bold block mb-2">二、不偷</span>
                              <span className="text-sm">不偷盗</span>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <span className="font-bold block mb-2">三、不淫</span>
                              <span className="text-sm">不邪淫</span>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <span className="font-bold block mb-2">四、不妄语</span>
                              <span className="text-sm">不虚言</span>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <span className="font-bold block mb-2">五、不酒</span>
                              <span className="text-sm">不饮酒</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xl font-bold text-[#8B4513] border-b border-amber-200 pb-2">十善业道详解</h4>
                        
                        {/* 1. 不杀生 */}
                        <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                          <h5 className="text-lg font-bold mb-3 text-[#8B4513]">1. 杀生恶念忏悔</h5>
                          <p className="leading-relaxed">一切众生，皆具生命，不应杀害而起恶意之心，为不杀生。即是以身，动活一切，应同仁，勿伤杀加害等。因为佛慈悲戒律，怜悯护爱，慈悲的众生，皆称赞以慈悲悲悯众生，故为不杀。</p>
                          <div className="mt-2 text-sm bg-amber-50/50 p-4 rounded-lg">
                            <p className="italic">佛子孔也曾说："阐其身，不忍食其肉。"</p>
                          </div>
                        </div>

                        {/* 2. 不偷盗 */}
                        <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                          <h5 className="text-lg font-bold mb-3 text-[#8B4513]">2. 不偷盗而利于用</h5>
                          <p className="leading-relaxed">偷窃非德物，盗窃损害物，一切不属于你的物品，必须归还，不可贪取为一。勿偷窃，主持孝敬，以物正，勿不贪取，非分而取物，勿骗取。能敬"义"而建"利"而后利人，利人利己利"财"义文。</p>
                        </div>

                        {/* 3. 不邪淫 */}
                        <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                          <h5 className="text-lg font-bold mb-3 text-[#8B4513]">3. 不邪淫而能节制</h5>
                          <p className="leading-relaxed">偷便正法结合之基础，不邪淫行淫。非吾妻，苟合淫欲，即为邪淫。能端正男女问之婚，勿不洁清，也避免男女奸乱。淫乱行为，是能祸害他人，成为家族，不贞其乱淫乱，是破坏家庭，成为祸害家族。</p>
                        </div>

                        {/* 4-7. 口业戒 */}
                        <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                          <h5 className="text-lg font-bold mb-4 text-[#8B4513]">口四业戒</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <h6 className="font-bold mb-2">4. 不妄语而诚实无欺</h6>
                              <p className="text-sm">以诚恳，以语待人，不妄语说谎，是说谎话，不虚伪的谎话。如能真诚实则，又能做到诚实无欺。</p>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <h6 className="font-bold mb-2">5. 不两舌而无争是非</h6>
                              <p className="text-sm">不两舌邪，不挑拨是非；不煽动恶人口，诸人不出，两舌交际。</p>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <h6 className="font-bold mb-2">6. 不恶口而善言诚信</h6>
                              <p className="text-sm">不恶口骂人，及不诋毁他人的恶毒语言。常人多恶语骂人，可祸患，当为善良人。</p>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <h6 className="font-bold mb-2">7. 不绮语而说正法</h6>
                              <p className="text-sm">一切邪淫，说花言巧语，轻浮无礼，语不正直的一句话，邪淫，皆为绮语。</p>
                            </div>
                          </div>
                        </div>

                        {/* 8-10. 意业戒 */}
                        <div className="bg-white/90 p-6 rounded-lg border border-amber-100">
                          <h5 className="text-lg font-bold mb-4 text-[#8B4513]">意三业戒</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <h6 className="font-bold mb-2">8. 不贪食而心念清净</h6>
                              <p className="text-sm">自己吃的物，不谄贪，违心贪，自吃饱财物，皆为贪食。能给予经济，能帮助社会，福利事业。</p>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <h6 className="font-bold mb-2">9. 不瞋恚而慈悲柔和</h6>
                              <p className="text-sm">嗔恚即嗔憎不顺，埋于心，发怒于形。故以慈悲忍怒消弭嗔恨，能忍辱性叶时力。</p>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-lg">
                              <h6 className="font-bold mb-2">10. 不邪见而光明智慧</h6>
                              <p className="text-sm">思想无明，迷昧，没有智慧，对事理无明。如能多明正理(佛法)，增长智慧，便可入圣见。</p>
                            </div>
                          </div>
                        </div>

                        {/* 总结 */}
                        <div className="bg-amber-50/50 p-6 rounded-lg mt-8">
                          <h5 className="text-lg font-bold mb-4 text-[#8B4513]">总结</h5>
                          <div className="space-y-4">
                            <p>以上不杀生，不偷盗，不邪淫，是为身三业；不妄语，不两舌，不恶口，不绮语，是为口四善业；不贪食，不嗔恚，不邪见，是为意三善业。</p>
                            <blockquote className="border-l-4 border-amber-300 pl-4 italic">
                              <p>诸恶莫作，众善奉行，自净其意，是诸佛戒。</p>
                            </blockquote>
                            <p>佛说人人生命的原动力，乃出于善人的"心"；故为人处，要持善念的时刻去善道，即能成就善友的好人，实践自己的时刻去善道，即能成就善业，自利利人。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SubSection>
                </div>
              </div>
            </div>
          </Section>

          <Section title="隣接事三則">
            <div className="bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-100">
              <div className="prose prose-xl max-w-none">
                <div className="space-y-12 text-lg leading-relaxed text-[#4A3728]">
                  <SubSection title="a) 在慈心之中保持">
                    <p className="mb-6">佛陀到摩竭陀国村庄托钵，有聚集门说佛陀不自由禅叶，而托钵向人乞食。佛陀与该寺院门中长老，回答对方的语言是：</p>
                    <blockquote className="pl-6 border-l-4 border-amber-300 italic">
                      <p>待是虔诚祈禱的种子；</p>
                      <p>智是虔诚祈禱的芽；</p>
                      <p>勤是虔诚的意业；</p>
                      <p>谢是虔诚的叶的果；</p>
                      <p>去而不可回，进行的意思，</p>
                      <p>将运送到虔诚的施地。</p>
                    </blockquote>
                  </SubSection>

                  <SubSection title="b) 佛徒尊事尊父">
                    <div className="space-y-6">
                      <p>佛时有外人士，在途中行人子之，以为相貌，称为相貌外。其恶事惹怒了佛罗多的国人民，大家都在向他。结果受佛陀斥责，出家为比丘。</p>
                      <p>尊者罗汉说："有不以人力正道，以及物做正道，尊母尊父，能行人法则。"</p>
                      <p>尊者尊父，过比丘生活，各各赎借土地，有信徒向佛陀，恳求他说："有许多必须给您，有的时候来您。佛陀，您想说些，圣者每次都吩咐，何谓您，如您，你在继续以您所起的恶业啊！"</p>
                    </div>
                  </SubSection>

                  <SubSection title="c) 那其实是于你的">
                    <p className="mb-6">有一天，佛陀在村林的食的时候，有一个寺院门说总想逃过，讲述来食。因为同族的亲人，出现到佛陀要求她，说完他先的难题之后，等跑到修行为僧时，向他讲述：</p>
                    <div className="bg-amber-50/50 p-6 rounded-lg mb-8">
                      <div className="space-y-4">
                        <p>"尊敬的，你施舍的粮食你也有法吃吗？"</p>
                        <p>"当然有，贤弟，有何必问呢！"</p>
                        <p>"尊敬门弟，那个时候，你觉得也将会侍奉人呢？"</p>
                        <p>"贤弟，那是当做的事！"</p>
                        <p>"尊敬门弟，假如那个时候，法官不接受你的粮食，那么，那些粮食应该归于谁呢？"</p>
                        <p>"爱是他的不了的说法，那些粮食只有好处归于我！"</p>
                      </div>
                    </div>
                    <p className="mb-6">佛陀以慈眼看查他一会儿，然后说道："尊敬门弟，你今天在法点的前面说许多话，但是我并不要急躁，所以你的无理言语，那是归于你的！尊敬门弟，假如来一样，因此不必浪费时间，就算如主家，如是来接触，因比我再告诉这一个真相！"</p>
                    <blockquote className="pl-6 border-l-4 border-amber-300 italic mb-6">
                      <p>对你的人的，以你爱还于；</p>
                      <p>是一件不应丢的事。</p>
                      <p>对你的的人，以你爱还于的人，</p>
                      <p>将得到两个利益：</p>
                      <p>知晓他的福德；</p>
                      <p>而以正念静缚自己的的人，</p>
                      <p>不可能胜于自己，</p>
                      <p>也能善于他人。</p>
                    </blockquote>
                    <p>这个尊敬门，在佛陀门下出家了，不久，成为阿罗汉。</p>
                  </SubSection>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
} 