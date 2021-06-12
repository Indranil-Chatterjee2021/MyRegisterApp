module.exports = {
  paginate: (options) => {
    let outputHtml = "";
    if (options.hash.current === 1) {
      outputHtml += `<li class="page-item disabled"><a class="page-link">First</a></li>`;
    } else {
      outputHtml += `<li class="page-item"><a class="page-link" href="?page=1">First</a></li>`;
    }

    let i =
      Number(options.hash.current) > 5 ? Number(options.hash.current) - 3 : 1;
    if (i !== 1) {
      outputHtml += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
    }
    for (
      ;
      i <= Number(options.hash.current) + 4 && i <= options.hash.pages;
      i++
    ) {
      if (i === options.hash.current) {
        outputHtml += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
      } else {
        outputHtml += `<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`;
      }
      if (i == Number(options.hash.current) + 4 && i < options.hash.pages) {
        outputHtml += `<li class="page-item disabled"><a class="page-link">...</a></li>`;
      }
    }
    if (options.hash.current == options.hash.pages) {
      outputHtml += `<li class="page-item disabled"><a class="page-link">Last</a></li>`;
    } else {
      outputHtml += `<li class="page-item"><a class="page-link" href="?page=${options.hash.pages}">Last</a></li>`;
    }
    return outputHtml;
  },
};
