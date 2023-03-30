export const parseMarkdown = (md: String) => {
    md = md.replace(/^\*(.+)/gm, "<div>- $1</div>");
    //ol
    md = md.replace(/^\s*\n\d\./gm, "<ol>\n1.");
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, "$1\n</ol>\n\n$2");
    md = md.replace(/^\d\.(.+)/gm, "<li>$1</li>");

    //blockquote
    md = md.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

    //h
    md = md.replace(/[\#]{6}(.+)/g, "<h6>$1</h6>");
    md = md.replace(/[\#]{5}(.+)/g, "<h5>$1</h5>");
    md = md.replace(/[\#]{4}(.+)/g, "<h4>$1</h4>");
    md = md.replace(/[\#]{3}(.+)/g, "<h3>$1</h3>");
    md = md.replace(/[\#]{2}(.+)/g, '<h4 class="font-bold text-lg ">$1</h4>');
    md = md.replace(/[\#]{1}(.+)/g, "<h1>$1</h1>");

    //alt h
    md = md.replace(/^(.+)\n\=+/gm, "<h1>$1</h1>");
    md = md.replace(/^(.+)\n\-+/gm, "<h2>$1</h2>");

    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

    //font styles
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{2}/g, "<b>$1</b>");

    //links
    md = md.replace(
        /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>)(\/([.a-z0-9_-]*[\\r\\n]?)))/g,
        '<a href="$1" class="link-truncated" target="_blank">$4</a>'
    );
    // replace @ by links
    md = md.replaceAll(/@(.*?)(\s)/g, '<a href="https://github.com/$1" target="_blank">@$1 </a>');

    //pre
    md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
    md = md.replace(/^\`\`\`\s*\n/gm, "</pre>\n\n");

    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, "<code>$1</code>");

    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, "$1$2");

    return md;
};
