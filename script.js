
    function checkEnter(event) {
        if (event.key === 'Enter') {
            search(); // вызываем функцию поиска при нажатии на Enter
        }
    }

    function search() {
        // Убираем предыдущее выделение
        const highlighted = document.querySelectorAll(".highlight");
        highlighted.forEach(elem => {
            elem.classList.remove("highlight", "fade-out");
        });

        const searchText = document.getElementById("searchInput").value;
        if (searchText === "") return;

        const regex = new RegExp(searchText, "gi");
        const textNodes = getTextNodes(document.body);

        let found = false;

        // Ищем совпадения в текстовых узлах
        textNodes.forEach(node => {
            if (regex.test(node.nodeValue)) {
                const span = document.createElement("span");
                span.classList.add("highlight");
                span.innerHTML = node.nodeValue.replace(regex, (match) => `<span class="highlight">${match}</span>`);

                node.parentNode.replaceChild(span, node);
                found = true;
            }
        });

        // Прокручиваем страницу к первому совпадению
        const firstHighlighted = document.querySelector(".highlight");
        if (firstHighlighted) {
            firstHighlighted.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        // Убираем выделение через 2 секунды
        setTimeout(() => {
            const highlightedElements = document.querySelectorAll(".highlight");
            highlightedElements.forEach(elem => {
                elem.classList.add("fade-out");
            });
        }, 2000);
    }

    function getTextNodes(root) {
        const nodes = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }
        return nodes;
    }