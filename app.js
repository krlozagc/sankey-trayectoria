/*
 * DIBUJA el diagrama a partir de window.SANKEY_DATA (definido en data.js).
 * No necesitas editar este archivo para cambiar contenido o idiomas — eso
 * va en data.js. Requiere: d3.v7 y d3-sankey (cargados antes en index.html).
 */
(function(){
  "use strict";

  var DATA = window.SANKEY_DATA;
  var UI = DATA.ui;
  var pillars = DATA.pillars;
  var pcolor = DATA.pcolor;
  var orgs = DATA.orgs;
  var skills = DATA.skills;
  var orgLinks = DATA.orgLinks;
  var skillPillar = {}; skills.forEach(function(s){ skillPillar[s.id] = s.pillar; });

  var currentLang = "es";
  var LANGS = [
    { id: "es", label: "ES" },
    { id: "en", label: "EN" },
    { id: "cat", label: "CAT" }
  ];

  // Jobs -> Pillars -> Skills. Pillars sit in the middle as the clean,
  // 4-node bottleneck; jobs and skills stay granular at the edges. Every
  // weight below is still a real count of CV achievements, just regrouped:
  // an org's pillar edge is the sum of its skill edges that land in that
  // pillar, and a pillar's skill edge reuses that skill's own total — so
  // ribbon thickness never narrows or widens without a real reason.
  var skillTotals = {};
  orgLinks.forEach(function(l){ skillTotals[l.t] = (skillTotals[l.t] || 0) + l.v; });

  var orgPillarTotals = {};
  orgLinks.forEach(function(l){
    var key = l.s + "|" + skillPillar[l.t];
    orgPillarTotals[key] = (orgPillarTotals[key] || 0) + l.v;
  });
  var orgPillarLinks = Object.keys(orgPillarTotals).map(function(key){
    var parts = key.split("|"), orgId = parts[0], pillarId = parts[1];
    var org = orgs.filter(function(o){ return o.id === orgId; })[0];
    var pillar = pillars.filter(function(p){ return p.id === pillarId; })[0];
    var v = orgPillarTotals[key];
    return { source: orgId, target: pillarId, value: v, pillar: pillarId, org: org, pillarRef: pillar, weight: v };
  });

  var pillarSkillLinks = skills.map(function(s){
    var pillar = pillars.filter(function(p){ return p.id === s.pillar; })[0];
    return { source: s.pillar, target: s.id, value: skillTotals[s.id], pillar: s.pillar, skillRef: s, pillarRef: pillar, weight: skillTotals[s.id] };
  });

  var nodes = []
    .concat(orgs.map(function(d){ return { id:d.id, label:d.label, full:d.full, kind:"org" }; }))
    .concat(pillars.map(function(d){ return { id:d.id, label:d.label, full:d.full, fact:d.fact, kind:"pillar" }; }))
    .concat(skills.map(function(d){ return { id:d.id, label:d.short, full:d.full, pillar:d.pillar, kind:"skill" }; }));

  var links = [].concat(orgPillarLinks).concat(pillarSkillLinks);

  var width = 1000, height = 730;
  var margin = { top: 50, right: 225, bottom: 18, left: 230 };

  var sankeyGen = d3.sankey()
    .nodeId(function(d){ return d.id; })
    .nodeWidth(14)
    .nodePadding(18)
    .nodeSort(null)
    .nodeAlign(d3.sankeyJustify)
    .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);

  var graph = sankeyGen({
    nodes: nodes.map(function(d){ return Object.assign({}, d); }),
    links: links.map(function(d){ return Object.assign({}, d); })
  });

  // A note (tooltip text) for each link, per language, computed after layout
  // so it can cite the real weight ("N achievements behind this").
  function linkNote(d, lang){
    if (d.org){ // org -> pillar
      var suffix = { es: d.weight===1 ? "logro" : "logros", en: d.weight===1 ? "achievement" : "achievements", cat: d.weight===1 ? "fita" : "fites" }[lang];
      var del = { es: " del CV.", en: " from the CV.", cat: " del CV." }[lang];
      return d.org.full[lang] + " → " + d.pillarRef.label[lang] + ": " + d.weight + " " + suffix + del;
    }
    // pillar -> skill
    var tail = {
      es: d.weight===1 ? " logro del CV lo respalda." : " logros del CV lo respaldan.",
      en: d.weight===1 ? " CV achievement backs this." : " CV achievements back this.",
      cat: d.weight===1 ? " fita del CV ho avala." : " fites del CV ho avalen."
    }[lang];
    return d.skillRef.full[lang] + " — " + d.weight + tail;
  }

  var svg = d3.select("#sankey");
  var tooltip = d3.select("#tooltip");

  var linkGroup = svg.append("g").attr("class", "links");
  var nodeGroup = svg.append("g").attr("class", "nodes");
  var labelGroup = svg.append("g").attr("class", "labels");

  var linkPathGen = d3.sankeyLinkHorizontal();

  var linkSel = linkGroup.selectAll("path")
    .data(graph.links)
    .join("path")
    .attr("class", "link-path")
    .attr("d", linkPathGen)
    .attr("stroke", function(d){ return pcolor[d.pillar]; })
    .attr("stroke-width", function(d){ return Math.max(1.2, d.width); })
    .on("mouseenter", function(ev, d){ highlight(d, "link"); showTip(ev, linkNote(d, currentLang), pillars.filter(function(p){return p.id===d.pillar;})[0].label[currentLang]); })
    .on("mousemove", moveTip)
    .on("mouseleave", clearHighlight);

  var nodeSel = nodeGroup.selectAll("rect")
    .data(graph.nodes)
    .join("rect")
    .attr("class", function(d){ return "node-rect" + (d.kind === "pillar" ? " pillar" : ""); })
    .attr("x", function(d){ return d.x0; })
    .attr("y", function(d){ return d.y0; })
    .attr("width", function(d){ return d.x1 - d.x0; })
    .attr("height", function(d){ return Math.max(1, d.y1 - d.y0); })
    .attr("rx", 3)
    .attr("fill", function(d){ return d.kind === "pillar" ? pcolor[d.id] : "var(--surface)"; })
    .on("mouseenter", function(ev, d){
      highlight(d, "node");
      var text = d.kind === "pillar" ? d.fact[currentLang] : d.full[currentLang];
      var kicker = d.kind === "pillar" ? d.full[currentLang] : d.label[currentLang];
      showTip(ev, text, kicker);
    })
    .on("mousemove", moveTip)
    .on("mouseleave", clearHighlight);

  // Org labels: left of the node, single line (leftmost column).
  var orgLabelSel = labelGroup.selectAll("text.org")
    .data(graph.nodes.filter(function(d){ return d.kind === "org"; }))
    .join("text")
    .attr("class", "node-label org")
    .attr("x", function(d){ return d.x0 - 10; })
    .attr("y", function(d){ return (d.y0 + d.y1) / 2; })
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle");

  // Skill labels: right of the node, single line (rightmost column).
  var skillLabelSel = labelGroup.selectAll("text.skill")
    .data(graph.nodes.filter(function(d){ return d.kind === "skill"; }))
    .join("text")
    .attr("class", "node-label skill")
    .attr("x", function(d){ return d.x1 + 10; })
    .attr("y", function(d){ return (d.y0 + d.y1) / 2; })
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "middle");

  // Pillar labels: short stat + bold name, centered above the node
  // (the middle column — the clean bottleneck the whole diagram funnels through).
  var pillarLabelSel = labelGroup.selectAll("g.pillar-label")
    .data(graph.nodes.filter(function(d){ return d.kind === "pillar"; }))
    .join("g")
    .attr("class", "pillar-label");

  pillarLabelSel.each(function(d){
    var orgCount = 0, skillCount = 0;
    graph.links.forEach(function(l){
      if (l.target.id === d.id) orgCount++;
      if (l.source.id === d.id) skillCount++;
    });
    d._orgCount = orgCount;
    d._skillCount = skillCount;
    var cx = (d.x0 + d.x1) / 2;
    var baseY = d.y0 - 7;
    var g = d3.select(this);
    g.append("text").attr("class", "node-label pillar-stat")
      .attr("x", cx).attr("y", baseY - 14).attr("text-anchor", "middle");
    g.append("text").attr("class", "node-label pillar-name")
      .attr("x", cx).attr("y", baseY).attr("text-anchor", "middle");
  });

  function nodeTouches(id){
    var s = new Set([id]);
    graph.links.forEach(function(l){
      if (l.source.id === id) s.add(l.target.id);
      if (l.target.id === id) s.add(l.source.id);
    });
    return s;
  }

  function highlight(d, from){
    var activeIds = from === "node" ? nodeTouches(d.id) : new Set([d.source.id, d.target.id]);
    nodeSel.classed("dim", function(n){ return !activeIds.has(n.id); });
    linkSel.classed("dim-link", function(l){
      if (from === "link") return l !== d;
      return !(activeIds.has(l.source.id) && activeIds.has(l.target.id));
    });
    labelGroup.selectAll("text, g").classed("dim", function(n){ return n && n.id ? !activeIds.has(n.id) : false; });
  }
  function clearHighlight(){
    nodeSel.classed("dim", false);
    linkSel.classed("dim-link", false);
    labelGroup.selectAll("text, g").classed("dim", false);
    hideTip();
  }

  function showTip(ev, text, kicker){
    tooltip.html("<span class='t-kicker'>" + kicker + "</span>" + text).classed("show", true);
    moveTip(ev);
  }
  function moveTip(ev){
    var pad = 14, tw = 300, th = 90;
    var x = ev.clientX + pad, y = ev.clientY + pad;
    if (x + tw > window.innerWidth) x = ev.clientX - tw - pad;
    if (y + th > window.innerHeight) y = ev.clientY - th - pad;
    tooltip.style("left", x + "px").style("top", y + "px");
  }
  function hideTip(){ tooltip.classed("show", false); }

  var legend = d3.select("#legend");
  var activePillar = null;
  var legendSel = legend.selectAll("button")
    .data(pillars)
    .join("button")
    .attr("data-active", true)
    .attr("type", "button")
    .on("click", function(ev, d){
      if (activePillar === d.id) {
        activePillar = null;
        clearHighlight();
        legend.selectAll("button").attr("data-active", true);
        return;
      }
      activePillar = d.id;
      legend.selectAll("button").attr("data-active", function(p){ return p.id === d.id; });
      var ids = new Set([d.id]);
      graph.links.forEach(function(l){
        if (l.pillar === d.id) { ids.add(l.source.id); ids.add(l.target.id); }
      });
      nodeSel.classed("dim", function(n){ return !ids.has(n.id); });
      linkSel.classed("dim-link", function(l){ return l.pillar !== d.id; });
      labelGroup.selectAll("text, g").classed("dim", function(n){ return n && n.id ? !ids.has(n.id) : false; });
    });

  // ---- Language switching: swaps text content only; layout never recomputes. ----

  function applyLanguage(lang){
    currentLang = lang;
    var t = UI[lang];

    d3.select("#eyebrow").text(t.eyebrow);
    d3.select("#h1").text(t.h1);
    d3.select("#subtitle").text(t.subtitle);
    d3.select("#byline-role").text(t.bylineRole);
    d3.select("#col-head-1").text(t.colHead1);
    d3.select("#col-head-2").text(t.colHead2);
    d3.select("#col-head-3").text(t.colHead3);
    d3.select("#footnote-left").text(t.footnoteLeft);
    d3.select("#sankey").attr("aria-label", t.colHead1 + " → " + t.colHead2 + " → " + t.colHead3);

    legendSel.html(function(d){ return "<span class='dot' style='background:" + pcolor[d.id] + "'></span>" + d.label[lang]; });

    orgLabelSel.text(function(d){ return d.label[lang]; });
    skillLabelSel.text(function(d){ return d.label[lang]; });

    pillarLabelSel.each(function(d){
      var g = d3.select(this);
      g.select(".pillar-stat").text(t.pillarStat.replace("{n}", d._orgCount).replace("{m}", d._skillCount));
      g.select(".pillar-name").text(d.label[lang]);
    });

    d3.select("#lang-switch").selectAll("button").attr("aria-pressed", function(l){ return l.id === lang; });
    hideTip();
  }

  d3.select("#lang-switch").selectAll("button")
    .data(LANGS)
    .join("button")
    .attr("type", "button")
    .text(function(d){ return d.label; })
    .on("click", function(ev, d){ applyLanguage(d.id); });

  applyLanguage(currentLang);
})();
