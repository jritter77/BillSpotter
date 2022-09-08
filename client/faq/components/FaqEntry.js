const FaqEntry = (question, answer) => {

    let container = $('<div></div>').css(containerStyle);

    let header = $('<div></div>').css(headerStyle);

    let title = $('<h2></h2>').text(question).css(titleStyle);

    let symbol = $('<p>+</p>').css(symbolStyle);

    let collapsible = $('<div></div>').addClass('collapsible').css(collapsibleStyle);

    let content = $('<p></p>').html(answer).css(contentStyle);


    header.click(() => {
        collapsible.toggleClass('active');

        symbol.text(symbol.text() === "+" ? "-" : "+");

        for (let c of [...$(".collapsible.active")]) {
            if (c !== collapsible[0]) {
                $(c).removeClass("active").trigger("compress_dropdown");
            }
        }
    });

    container.on("compress_dropdown", () => {
        symbol.text("+");
      });



    container.append(
        header.append(title, symbol), 
        collapsible.append(content)
    );

    return container;

}

const containerStyle = {
    width: '70vw',
    background: 'black',
    border: '2px solid black',
    margin: '5%'
};
const headerStyle = {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    color: 'white',
    background: 'black'
};
const titleStyle = {
    color: "white",
    margin: 0,
    padding: "5%",
    "font-size": "var(--md-font-size)",
};
const collapsibleStyle = {
    background: "white",
    "font-size": "var(--md-font-size)",
  };
const contentStyle = {
    background: 'white',
    margin: '5%',
    'text-align': 'center',
};
const symbolStyle = {
    "font-size": "var(--xxl-font-size)",
    color: "white",
    margin: 0,
    padding: "5%",
  };

export {FaqEntry}