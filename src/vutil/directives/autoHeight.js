export default el => {
  const clientRect = el.getBoundingClientRect();
  const [clientWidth, clientHeight] = [
    document.body.clientWidth,
    document.body.clientHeight
  ];
};
