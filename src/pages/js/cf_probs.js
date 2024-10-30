
const prob = {
    name: "",
    contest: "",
    link: ""
};

function sects() {
    this.ratings = 0;
    this.problems = [];
    this.problem_count = 0;

    this.getContest = function (x) {
        return this.problems[x].contest;
    };
    this.getLink = function (x) {
        return this.problems[x].link;
    };
    this.getName = function (x) {
        return this.problems[x].name;
    };
};

async function fetchPastebinContent(pasteKey) {
    const url = `https://pastebin.com/raw/${pasteKey}`; // Using the raw URL to get the paste content directly

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.text(); // Get the text content of the paste
        // console.log(data); // Log the content to the console 
        return data;
    } catch (error) {
        console.error('Failed to fetch the paste:', error);
    }
}

export async function getText(){
    let text = await fetchPastebinContent('QgxHyhiH');
    let text_lines = text.split(/\r\n|\r|\n/);

    let lines = [];
    for (let i = 0; i < text_lines.length; i++){
        if (text_lines[i] == '' || text_lines[i][0] == '-') continue;
        lines.push(text_lines[i]);
    }
    let sections = [];
    let curr = null;
    for (let i = 0; i < lines.length; i++){
        let current_line = lines[i];
        if (current_line[0] === "#"){
            console.log(current_line);
            if (curr !== null) sections.push(curr);
            curr = new sects();
            curr.ratings = Number(current_line.split(" ")[1].split("s")[0]);
            console.log(curr.ratings);
        }
        else {
            let p = prob;
            p.name = current_line.split("name: ")[0].split(" (")[0].split(")")[0];
            p.contest = current_line.split("(")[1].split(")")[0];
            i += 1;
            p.link = lines[i];
            curr.problems.push(p);
            curr.problem_count ++;
        }
    }
    sections.push(curr);
    console.log(sections);
    return sections;
};