import * as cheerio from 'cheerio'

/**
 * 节点
 */
export class Node {
    /** 节点名称 */
    public name: string = '';
    /** 节点标题（显示的名称） */
    public title: string = '';
}

/**
 * 话题
 */
export class Topic {
    /** id */
    public id: string = '';
    /** 标题 */
    public title: string = '';
    /** 链接 */
    public link: string = '';
    /** 节点 */
    public node: Node = { title: '', name: '' };
}

/**
 * 话题详情
 */
export class TopicDetail {
  /** id */
  public id: number = 0;
  /** 链接 */
  public link: string = '';
  /** 校验参数，可用来判断是否登录或登录是否有效 */
  public once: string = '';
  /** 标题 */
  public title: string = '';
  /** 节点 */
  public node: Node = { title: '', name: '' };
  /** 作者头像 */
  public authorAvatar: string = '';
  /** 作者名字 */
  public authorName: string = '';
  /** 时间 */
  public displayTime: string = '';
  /** 点击次数 */
  public visitCount: number = 0;
  /** 内容 */
  public content: string = '';
  /** 追加内容 */
  public appends: TopicAppend[] = [];
  /** 收藏人数 */
  public collectCount: number = 0;
  /** 感谢人数 */
  public thankCount: number = 0;
  /** 是否已收藏 */
  public isCollected: boolean = false;
  /** 是否已感谢 */
  public isThanked: boolean = false;
  /** 是否能发送感谢（自己的帖子不能发送感谢） */
  public canThank: boolean = true;
  /** 收藏/取消收藏参数t */
  public collectParamT: string | null = null;
  /** 回复总条数 */
  public replyCount: number = 0;
  /** 回复 */
  public replies: TopicReply[] = [];
}

/**
 * 话题追加内容
 */
export class TopicAppend {
  /** 追加时间 */
  public time: String = '';
  /** 追加内容 */
  public content: string = '';
}

/**
 * 话题回复
 */
export class TopicReply {
  /** 回复id */
  public replyId: string = '';
  /** 用户头像 */
  public userAvatar: string = '';
  /** 用户名 */
  public userName: string = '';
  /** 回复时间 */
  public time: string = '';
  /** 楼层 */
  public floor: string = '';
  /** 回复内容 */
  public content: string = '';
  /** 感谢数 ❤ */
  public thanks: number = 0;
  /** 感谢已发送 */
  public thanked: boolean = false;
}

export const getAllNodes = async () => {
    const data = await fetch('https://www.v2ex.com/planes')
    const html = await data.text()
    const $ = cheerio.load(html);
    const nodes: {name: string, title: string}[] = [];
    $('a.item_node').each((_, element) => {
      nodes.push({
        name: $(element).attr('href')?.split('go/')[1] || '',
        title: $(element).text().trim(),
      });
    });
    console.log(`获取到${nodes.length}个节点`);
    return nodes;
}
export const getAllTabs = () => {
    return [
        {title: '技术', value: 'tech'},
        {title: '创意', value: 'creative'},
        {title: '好玩', value: 'play'},
        {title: 'Apple', value: 'apple'},
        {title: '酷工作', value: 'jobs'},
        {title: '交易', value: 'deals'},
        {title: '城市', value: 'city'},
        {title: '问与答', value: 'qna'},
        {title: '最热', value: 'hot'},
        {title: 'R2', value: 'r2'},
        {title: '节点', value: 'nodes'},
    ]
}
export const getTopicListByTab = async (tab: string): Promise<Topic[]> => {
    const data = await fetch(`https://www.v2ex.com/?tab=${tab}`)
    const html = await data.text();
    const $ = cheerio.load(html);
    const cells = $('#Main > .box').eq(0).children('.cell.item');

    const list: Topic[] = [];
    cells.each((_, cell) => {
      const topicElement = $(cell).find('a.topic-link');
      const nodeElement = $(cell).find('a.node');

      const topic = new Topic();
      const topicHref = topicElement.attr('href')?.split('#')[0];
      topic.title = topicElement.text().trim();
      topic.link = 'https://www.v2ex.com' + topicHref;
      topic.id = topicHref?.split('/')[1] || '';

      topic.node = {
        name: nodeElement.attr('href')?.split('go/')[1] || '',
        title: nodeElement.text().trim(),
      };
      list.push(topic);
    });
    return list;
}
export const getTopicDetail = async (topicLink: string): Promise<TopicDetail> => {
  const data = await fetch(`${topicLink}?p=1`);
  const html = await data.text();
  const $ = cheerio.load(html);
  /**
     * 部分帖子需要登录查看
     * 第1种：会重定向到登录页（https://www.v2ex.com/signin?next=/t/xxxxxx），并提示：你要查看的页面需要先登录。如交易区：https://www.v2ex.com/t/704753
     * 第2种：会重定向到首页，无提示。如：https://www.v2ex.com/t/704716
     * 第3种：账号访问受限（如新用户），会重定向到 https://www.v2ex.com/restricted
     */
  // if (res.request._redirectable._redirectCount > 0) {
  //   if (res.request.path.indexOf('/signin') >= 0) {
  //     // 登录失效，删除cookie
  //     G.setCookie('');
  //     throw new LoginRequiredError('你要查看的页面需要先登录');
  //   }
  //   if (res.request.path === '/') {
  //     if (G.getCookie()) {
  //       throw new Error('您无权访问此页面');
  //     } else {
  //       throw new LoginRequiredError('你要查看的页面需要先登录');
  //     }
  //   }
  //   if (res.request.path.indexOf('/restricted') === 0) {
  //     throw new AccountRestrictedError(
  //       '访问受限，详情请查看 <a href="https://www.v2ex.com/restricted">https://www.v2ex.com/restricted</a>'
  //     );
  //   }
  //   throw new Error('未知错误');
  // }

  const topic = new TopicDetail();
  topic.id = parseInt(topicLink.split('/t/')[1] || '0');
  topic.link = topicLink;
  topic.once = $('a.light-toggle').attr('href')?.split('?once=')[1] || '';
  topic.title = $('.header > h1').text();
  const node = $('.header > a').eq(1);
  topic.node = {
    name: node.attr('href')?.split('go/')[1] || '',
    title: node.text().trim(),
  };
  topic.authorAvatar = $('.header > .fr img.avatar').attr('src') || '';
  const meta = $('.header > .gray').text().split('·');
  topic.authorName = meta[0].trim();
  topic.displayTime = meta[1].trim();
  topic.visitCount = parseInt(meta[2].trim());
  topic.content = $('.topic_content').html() || '';
  $('.subtle').each((_, element) => {
    topic.appends.push({
      time: $(element).children('.fade').text().split('·')[1].trim(),
      content: $(element).children('.topic_content').html() || '',
    });
  });

  const topicButtons = $('.topic_buttons');
  if (topicButtons.length) {
    const countStr = topicButtons.children('.topic_stats').text();
    if (/(\d+)\s*人收藏/.test(countStr)) {
      topic.collectCount = parseInt(RegExp.$1);
    }
    if (/(\d+)\s*人感谢/.test(countStr)) {
      topic.thankCount = parseInt(RegExp.$1);
    }
    const collectButton = topicButtons.children('a.tb').eq(0);
    topic.isCollected = collectButton.text().indexOf('取消收藏') >= 0;
    topic.collectParamT = collectButton.attr('href')?.split('?t=')[1] || null;
    topic.canThank = topicButtons.children('#topic_thank').length > 0;
    topic.isThanked = topicButtons.find('.topic_thanked').length > 0;
  }

  topic.replyCount =
    parseInt(
      $('#Main > .box')
        .eq(1)
        .children('div.cell')
        .eq(0)
        .find('span.gray')
        .text()
        .split('•')[0]
    ) || 0;

  /**
   * 获取回复
   * @param $ 页面加载后的文档
   */
  const _getTopicReplies = ($: cheerio.CheerioAPI): TopicReply[] => {
    const replies: TopicReply[] = [];
     $('#Main > .box')
      .eq(1)
      .children('div[id].cell')
      .each((_, element) => {
        replies.push({
          replyId: $(element).attr('id')?.split('r_')[1] || '0',
          userAvatar: $(element).find('img.avatar').attr('src') || '',
          userName: $(element).find('a.dark').html() || '',
          time: $(element).find('span.ago').text(),
          floor: $(element).find('span.no').text(),
          content: $(element).find('.reply_content').html() || '',
          thanks: parseInt(
            $(element).find('span.small.fade').text().trim() || '0'
          ),
          thanked: $(element).find('.thank_area.thanked').length > 0,
        });
      });
    return replies;
  };

  // 获取评论
  topic.replies = _getTopicReplies($);
  const pager = $('#Main > .box').eq(1).find('.cell:not([id]) table');
  if (pager.length) {
    // 如果获取分页组件，表示有多页评论
    const totalPage = parseInt(
      pager.find('td').eq(0).children('a').last().text()
    );
    console.log(`${topicLink}：一共${totalPage}页回复`);

    const promises: Promise<string>[] = [];
    for (let p = 2; p <= totalPage; p++) {
      const request = async () => {
        const data = await fetch(`${topicLink}?p=${p}`)
        const html = await data.text()
        return html;
      }
      promises.push(request());
    }
    try {
      const resList = await Promise.all(promises);
      resList
        .forEach((html) => {
          const replies = _getTopicReplies(cheerio.load(html));
          topic.replies = topic.replies.concat(replies);
          // 有时候会出现统计的回复数与实际获取到的回复数量不一致的问题，修正一下回复数量
          if (topic.replies.length > topic.replyCount) {
            topic.replyCount = topic.replies.length;
          }
        });
    } catch (error) {}
  }
  return topic;
}
