function animateNodeInTree(data, node) {
    const children = data.children;
    children.forEach(element => {
      if (element.name === node) {
        element.circleProps = {
          fill: "red"
        };
        return;
      } else if (element.hasOwnProperty("children")) {
        animateNodeInTree(element, node);
      }
    });
    return data;
}

export default animateNodeInTree;
