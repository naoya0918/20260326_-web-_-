/* Scroll Reveal（IntersectionObserver） */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".fade-in");
  if (!targets.length) return;

  // 見つけた順にちょっとずつ遅らせる（プロっぽい小技）
  targets.forEach((el, index) => {
    el.style.setProperty("--fade-delay", `${index * 120}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // 1回表示したら以降は触らない
        }
      }
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px", // 少し手前で発火させる
    }
  );

  targets.forEach((el) => observer.observe(el));

  // Contactボタン（mailtoリンク）クリック時のポップアップ
  const mailLink = document.querySelector(".contact__mail");
  if (mailLink) {
    mailLink.addEventListener("click", () => {
      alert("お問い合わせありがとうございます！3ヶ月以内に独立する男がお返事します。");
    });
  }
});
