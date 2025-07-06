export function calculateVATScores(wmcScore, ipScore) {

    const wmv = wmcScore.image;
    const wma = wmcScore.audio;
    const wmt = wmcScore.text;
    const ipv = ipScore.image;
    const ipa = ipScore.audio;
    const ipt = ipScore.text;

    const S = wmv + wma + wmt + ipv + ipa + ipt;

    if (S === 0) return { v: 0, a: 0, t: 0 };

    const v = (wmv + ipv) / S;
    const a = (wma + ipa) / S;
    const t = (wmt + ipt) / S;

    return { v: parseFloat(v.toFixed(3)), a: parseFloat(a.toFixed(3)), t: parseFloat(t.toFixed(3)) };
  }