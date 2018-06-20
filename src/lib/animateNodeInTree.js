function animateNodeInTree(data, node) { 
  // Traverse the `data` provided to the Tree diagram and find the current `node` being traversed as per the traversedlist.
  // Change the color the node by adding a circleProps property to the node object.
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
