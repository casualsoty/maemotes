export const openMaemotes = _ => {
  new Dialog({
    title: "Maemotes",
    buttons: {
     one: { icon: '<img src="./artwork/weary.png">' },
     two: { icon: '<i class="fas fa-times"></i>' },
     three: { icon: '<i class="fas fa-times"></i>' }
    }
   }).render(true);
}
