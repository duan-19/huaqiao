const museumImage = (number, sourceFile, title, alt, category, description) => ({
  id: `museum-${String(number).padStart(2, '0')}`,
  src: `/images/museum/museum-${String(number).padStart(2, '0')}.webp`,
  thumb: `/images/museum/museum-${String(number).padStart(2, '0')}-thumb.webp`,
  sourceFile,
  title,
  alt,
  category,
  location: category === '场馆建筑' ? '华侨博物院' : '场馆寻访',
  description,
})

// 图片顺序与团队原始照片一一对应。拍摄日期尚待团队核实，因此不在前端展示。
export const museumGallery = [
  museumImage(1, 'P1025904.JPG', '书信影像装置', '展厅中悬挂展示的手写书信影像装置', '空间展陈', '从层叠的文字与纸张进入侨批记忆的叙事空间。'),
  museumImage(2, 'P1025907.JPG', '纸页之间', '从另一角度拍摄的手写书信影像装置', '空间展陈', '纸页、光影与展厅结构共同构成历史阅读的入口。'),
  museumImage(3, 'P1025908.JPG', '手写家书细节', '多张手写信件与信封的近景', '侨批文献', '镜头记录信札的书写痕迹，不对信件年代与具体身份作未经核实的判断。'),
  museumImage(4, 'P1025923.JPG', '展柜中的历史文献', '展柜中陈列的纸质历史文献与说明牌', '侨批文献', '通过展柜中的文献形态，观察书信如何成为连接海外与故乡的媒介。'),
  museumImage(5, 'P1025924.JPG', '并列陈列的信件', '展柜中并列陈列的两件纸质文献', '侨批文献', '并列展陈让纸张、字迹与保存状态更直观地呈现在参访者面前。'),
  museumImage(6, 'P1025926.JPG', '票据与信函展陈', '展柜中陈列的信函与票据类文献', '侨批文献', '信函与票据共同呈现侨批兼具家书与汇款凭证的历史形态。'),
  museumImage(7, 'P1025928.JPG', '侨批流转史料', '介绍侨批流转与侨乡生活的展陈面板', '史料展陈', '从公开展陈文字和历史图像中梳理侨批流转的基本线索。'),
  museumImage(8, 'P1025929.JPG', '文献与影像相互印证', '由侨批文献、历史照片和说明文字组成的展陈墙', '史料展陈', '不同类型的公开材料并置，为课堂内容提供进一步的观察角度。'),
  museumImage(9, 'P1025930.JPG', '展墙里的侨乡记忆', '展示历史照片和纸质文献的深色展墙', '史料展陈', '团队在展墙前继续寻找侨批与侨乡社会之间的联系。'),
  museumImage(10, 'P1025931.JPG', '记录展陈线索', '团队成员在展厅中用手机记录历史展陈', '团队实践', '用影像记录公开展陈中的关键信息，为后续资料整理保留线索。'),
  museumImage(11, 'P1025932.JPG', '驻足阅读展墙', '团队成员在历史文献展墙前驻足观看', '团队实践', '从社区课堂走进展馆，在真实空间中继续理解此前讲述的内容。'),
  museumImage(12, 'P1025938.JPG', '近距离观看文献', '团队成员近距离观看墙面陈列的历史文献', '团队实践', '面对具体文献形态，重新思考家书、汇款与家国记忆之间的关系。'),
  museumImage(13, 'P1025939.JPG', '使用互动展项', '团队成员在展厅中操作互动展示设备', '团队实践', '通过互动展项补充对展览主题和历史背景的理解。'),
  museumImage(14, 'P1025940.JPG', '在展项前继续学习', '团队成员在历史文献旁使用互动展示设备', '团队实践', '将现场观察、展陈说明与课堂问题放在一起比较和记录。'),
  museumImage(15, 'P1025942.JPG', '印章与纸质票据', '展台上的印章与纸质票据展示', '侨批文献', '细节影像呈现侨批传递过程中常见的纸质媒介与印记。'),
  museumImage(16, 'P1025943.JPG', '侨汇票据展板', '由侨汇票据、历史照片和说明文字组成的展板', '史料展陈', '票据、人物影像与文字说明共同构成理解侨汇历史的公开材料。'),
  museumImage(17, 'P1025945.JPG', '光影中的书信记忆', '展厅内由书信影像构成的发光展陈装置', '空间展陈', '以现代展陈方式呈现跨越山海的书信记忆。'),
  museumImage(18, 'P1025950.JPG', '华侨博物院建筑', '华侨博物院建筑正面与馆名', '场馆建筑', '团队在完成三期社区宣讲后走进相关场馆，继续开展学习和史料寻访。'),
]

export const videos = [
  {
    id: 'war-memory',
    courseId: 'war',
    title: '烽火侨心影像资料',
    description: '来自第一期社区宣讲课件的内嵌影像素材，拟用于补充南侨机工与抗战华侨力量的课程内容。',
    src: '/videos/war-memory.mp4',
    poster: '/images/videos/war-memory.webp',
    type: 'video/mp4',
    source: '第一期《烽火侨心——抗战华侨力量》课件内嵌素材',
    rightsStatus: '上线前需核验素材来源及公开传播授权',
    publishable: false,
  },
  {
    id: 'youth-craft',
    courseId: 'youth',
    title: '少年榜样课堂互动影像',
    description: '来自第二期社区宣讲课件的内嵌影像素材，拟用于展示课堂内容或手工互动环节。',
    src: '/videos/youth-craft.mp4',
    poster: '/images/videos/youth-craft.webp',
    type: 'video/mp4',
    source: '第二期《少年榜样·青年华侨先烈》课件内嵌素材',
    rightsStatus: '上线前需核验素材来源及公开传播授权',
    publishable: false,
  },
]

export const venues = [
  {
    id: 'overseas-chinese-museum',
    name: '华侨博物院',
    type: '华侨历史综合展馆',
    cover: '/images/museum/museum-18.webp',
    alt: '华侨博物院建筑正面与馆名',
    summary: '三期社区宣讲完成后，团队走进华侨博物院，通过公开展陈、历史照片、文献和实物说明进一步学习华侨华人历史。',
    focus: ['抗战时期华侨支援祖国的相关展陈', '华侨华人与故乡之间的长期联系', '陈嘉庚先生的爱国与教育实践'],
    takeaway: '把课堂中使用的概念带回历史现场核对，并记录可继续查证的史料线索。',
    visitDate: '',
    note: '具体参访日期待团队核实',
  },
  {
    id: 'xiamen-qiaopi',
    name: '厦门侨批馆',
    type: '侨批文化专题场馆',
    cover: '/images/museum/museum-03.webp',
    alt: '多张手写信件与信封的近景',
    summary: '团队围绕侨批的书信与汇款功能，阅读公开展陈说明，观察信件、票据与相关影像，继续理解跨越山海的家国牵挂。',
    focus: ['侨批“银信合一”的基本形态', '侨批流转与侨乡社会记忆', '家书文字中的亲情、信义与家国情怀'],
    takeaway: '将第三期社区宣讲中的问题带到展馆，在具体文献形态和历史情境中寻找更完整的回答。',
    visitDate: '',
    note: '具体参访日期待团队核实',
  },
]

export const visitJourney = [
  {
    number: '01',
    label: '社区传薪',
    title: '先完成三期社区宣讲',
    description: '以烽火侨心、少年榜样和山海侨批为主题，先在社区与青少年展开三次真实对话。',
  },
  {
    number: '02',
    label: '寻访侨迹',
    title: '再走进华侨文化场馆',
    description: '带着课堂中产生的问题，进入华侨博物院和厦门侨批馆继续学习。',
  },
  {
    number: '03',
    label: '溯源侨史',
    title: '从公开展陈寻找线索',
    description: '观察展品、文献、照片和说明文字，记录仍需进一步核验的内容与来源。',
  },
  {
    number: '04',
    label: '数字留存',
    title: '整理为长期开放资源',
    description: '把课件、照片、实践报道和学习笔记整理进数字科普平台，服务后续传播。',
  },
]

export const visitHighlights = [
  {
    id: 'from-classroom',
    number: '01',
    imageId: 'museum-18',
    title: '从社区课堂，走向历史现场',
    description: '场馆寻访发生在三期社区宣讲之后。团队不是先参观再宣讲，而是带着课堂中的问题继续寻找答案。',
  },
  {
    id: 'read-qiaopi',
    number: '02',
    imageId: 'museum-03',
    title: '从一封书信，理解山海牵挂',
    description: '信件、票据与公开说明让“侨批”不再只是课件中的词语，而成为可以被观察、阅读和继续查证的历史材料。',
  },
  {
    id: 'record-clues',
    number: '03',
    imageId: 'museum-10',
    title: '用镜头记录可核验的线索',
    description: '团队记录公开展陈信息，为后续整理史料来源、完善课程内容和建设数字页面保留依据。',
  },
  {
    id: 'digital-archive',
    number: '04',
    imageId: 'museum-15',
    title: '让一次寻访，成为持续开放的资源',
    description: '现场观察最终回到网页：形成场馆故事、照片档案和科普内容，让实践成果可以继续被浏览和使用。',
  },
]
