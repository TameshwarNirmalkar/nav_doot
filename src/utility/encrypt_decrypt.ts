export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type CheckinMap = Record<string, string>;

const KEYARR = ["xakx", "sznx", "zses", "zezf", "xcfs", "zxcs"];

const TextIterator = (txt: string): string => {
  const checkin: CheckinMap = {
    a: "sab",
    b: "sbc",
    c: "scd",
    d: "sde",
    e: "sef",
    f: "sfg",
    g: "sgh",
    h: "shi",
    i: "sij",
    j: "sjk",
    k: "skl",
    l: "slm",
    m: "smn",
    n: "sno",
    o: "sop",
    p: "spq",
    q: "sqr",
    r: "srs",
    s: "sst",
    t: "stu",
    u: "suv",
    v: "svw",
    w: "swx",
    x: "sxy",
    y: "syz",
    z: "sza",
    "1": "non",
    "2": "ntw",
    "3": "nth",
    "4": "nfo",
    "5": "nfi",
    "6": "nsi",
    "7": "nse",
    "8": "nei",
    "9": "nni",
    "0": "nze",
    A: "cab",
    B: "cbc",
    C: "ccb",
    D: "cde",
    E: "cef",
    F: "cfg",
    G: "cgh",
    H: "chi",
    I: "cij",
    J: "cjk",
    K: "ckl",
    L: "clm",
    M: "cmn",
    N: "cno",
    O: "cop",
    P: "cpq",
    Q: "cqr",
    R: "crs",
    S: "cst",
    T: "ctw",
    W: "cwx",
    X: "cxy",
    Y: "cyz",
    Z: "cza",
    "!": "mex",
    "@": "mat",
    "#": "mha",
    $: "mdo",
    "%": "mpe",
    "^": "mca",
    "&": "man",
    "*": "mas",
    "(": "mlb",
    ")": "mrb",
    "{": "mlc",
    "[": "mls",
    "]": "mrs",
    "}": "mrc",
    "/": "msl",
    "-": "mmi",
    "+": "mpl",
    "~": "msi",
    ";": "mse",
    ":": "mco",
    " ": "spa",
    "=": "meq",
    _: "mun",
    "|": "mor",
    "\\": "mfs",
    "`": "min",
    ".": "mdt",
    ",": "mcm",
    "'": "mqu",
    '"': "mdq",
    "?": "mqe",
    "<": "mgr",
    ">": "msr",
  };
  let enc = "";
  for (let i = 0; i < txt.length; i++) {
    if (checkin[txt[i]]) {
      enc += checkin[txt[i]];
    } else {
      enc += `${txt[i]}##`;
    }
  }
  return enc;
};

export const encrypt = (text: string): string => {
  const randCode = Math.floor(Math.random() * KEYARR.length);
  let encrypted = randCode.toString();
  encrypted += TextIterator(text);
  encrypted += KEYARR[Number(encrypted[0])];
  return encrypted;
};

export const decrypt = (encrypted: string | undefined): string | undefined => {
  if (!encrypted || encrypted.length <= 0) {
    return;
  }

  const checkin: CheckinMap = {
    nze: "0",
    non: "1",
    ntw: "2",
    nth: "3",
    nfo: "4",
    nfi: "5",
    nsi: "6",
    nse: "7",
    nei: "8",
    nni: "9",
    sab: "a",
    sbc: "b",
    scd: "c",
    sde: "d",
    sef: "e",
    sfg: "f",
    sgh: "g",
    shi: "h",
    sij: "i",
    sjk: "j",
    skl: "k",
    slm: "l",
    smn: "m",
    sno: "n",
    sop: "o",
    spq: "p",
    sqr: "q",
    srs: "r",
    sst: "s",
    stu: "t",
    suv: "u",
    svw: "v",
    swx: "w",
    sxy: "x",
    syz: "y",
    sza: "z",
    cab: "A",
    cbc: "B",
    ccb: "C",
    cde: "D",
    cef: "E",
    cfg: "F",
    cgh: "G",
    chi: "H",
    cij: "I",
    cjk: "J",
    ckl: "K",
    clm: "L",
    cmn: "M",
    cno: "N",
    cop: "O",
    cpq: "P",
    cqr: "Q",
    crs: "R",
    cst: "S",
    ctw: "T",
    cwx: "W",
    cxy: "X",
    cyz: "Y",
    cza: "Z",
    mex: "!",
    mat: "@",
    mha: "#",
    mdo: "$",
    mpe: "%",
    mca: "^",
    man: "&",
    mas: "*",
    mlb: "(",
    mrb: ")",
    mlc: "{",
    mls: "[",
    mrs: "]",
    mrc: "}",
    msl: "/",
    mmi: "-",
    mpl: "+",
    msi: "~",
    mse: ";",
    mco: ":",
    spa: " ",
    meq: "=",
    mun: "_",
    mor: "|",
    mfs: "\\",
    min: "`",
    mdt: ".",
    mcm: ",",
    mqu: "'",
    mdq: '"',
    mqe: "?",
    mgr: "<",
    msr: ">",
  };

  // const keyarr = ["xakx", "sznx", "zses", "zezf", "xcfs", "zxcs"];
  const randCode = encrypted[0];
  const lastFour = encrypted.slice(-4);

  let decrypted = "";

  if (
    !Number.isNaN(parseInt(randCode)) &&
    lastFour === KEYARR[Number(randCode)]
  ) {
    let toFind = "";
    let counter = 0;
    const text = encrypted.slice(1, -4);

    for (let i = 0; i <= text.length; i++) {
      if (counter === 3) {
        if (checkin[toFind]) {
          decrypted += checkin[toFind];
        } else {
          decrypted += toFind[0] ?? "";
        }
        counter = 0;
        toFind = "";
        i = i - 1;
      } else {
        counter++;
        toFind += text[i] ?? "";
      }
    }
  } else {
    decrypted = encrypted;
  }

  return decrypted;
};
