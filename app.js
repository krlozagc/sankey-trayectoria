/*
 * DIBUJA el diagrama a partir de window.SANKEY_DATA (definido en data.js).
 * No necesitas editar este archivo para cambiar contenido — eso va en data.js.
 * Requiere: d3.v7 y d3-sankey (cargados antes que este script en index.html).
 */
(function(){
  "use strict";

  var DATA = window.SANKEY_DATA;
  var pillars = DATA.pillars;
  var pcolor = DATA.pcolor;
  var orgs = DATA.orgs;
  var skills = DATA.skills;
  var orgLinks = DATA.orgLinks;
  var skillPillar = {}; skills.forEach(function(s){ skillPillar[s.id] = s.pillar; });

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
    return { source: orgId, target: pillarId, value: v, pillar: pillarId,
             note: org.full + " → " + pillar.label + ": " + v + " logro" + (v===1?"":"s") + " del CV." };
  });

  var pillarSkillLinks = skills.map(function(s){
    return { source: s.pillar, target: s.id, value: skillTotals[s.id], pillar: s.pillar,
             note: s.full + " — " + skillTotals[s.id] + " logro" + (skillTotals[s.id]===1?"":"s") + " del CV lo respaldan." };
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
    .on("mouseenter", function(ev, d){ highlight(d, "link"); showTip(ev, d.note, pillars.filter(function(p){return p.id===d.pillar;})[0].label); })
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
      var text = d.kind === "pillar" ? d.fact : d.full;
      var kicker = d.kind === "pillar" ? d.full : d.label;
      showTip(ev, text, kicker);
    })
    .on("mousemove", moveTip)
    .on("mouseleave", clearHighlight);

  // Org labels: left of the node, single line (leftmost column).
  labelGroup.selectAll("text.org")
    .data(graph.nodes.filter(function(d){ return d.kind === "org"; }))
    .join("text")
    .attr("class", "node-label org")
    .attr("x", function(d){ return d.x0 - 10; })
    .attr("y", function(d){ return (d.y0 + d.y1) / 2; })
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .text(function(d){ return d.label; });

  // Skill labels: right of the node, single line (rightmost column).
  labelGroup.selectAll("text.skill")
    .data(graph.nodes.filter(function(d){ return d.kind === "skill"; }))
    .join("text")
    .attr("class", "node-label skill")
    .attr("x", function(d){ return d.x1 + 10; })
    .attr("y", function(d){ return (d.y0 + d.y1) / 2; })
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "middle")
    .text(function(d){ return d.label; });

  // Pillar labels: short stat + bold name, centered above the node
  // (the middle column — the clean bottleneck the whole diagram funnels through).
  var pillarLabel = labelGroup.selectAll("g.pillar-label")
    .data(graph.nodes.filter(function(d){ return d.kind === "pillar"; }))
    .join("g")
    .attr("class", "pillar-label");

  pillarLabel.each(function(d){
    var orgCount = 0, skillCount = 0;
    graph.links.forEach(function(l){
      if (l.target.id === d.id) orgCount++;
      if (l.source.id === d.id) skillCount++;
    });
    var cx = (d.x0 + d.x1) / 2;
    var baseY = d.y0 - 7;
    var g = d3.select(this);
    g.append("text")
      .attr("class", "node-label pillar-stat")
      .attr("x", cx).attr("y", baseY - 14)
      .attr("text-anchor", "middle")
      .text(orgCount + " trabajos · " + skillCount + " habilidades");
    g.append("text")
      .attr("class", "node-label pillar-name")
      .attr("x", cx).attr("y", baseY)
      .attr("text-anchor", "middle")
      .text(d.label);
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
  legend.selectAll("button")
    .data(pillars)
    .join("button")
    .attr("data-active", true)
    .attr("type", "button")
    .html(function(d){ return "<span class='dot' style='background:" + pcolor[d.id] + "'></span>" + d.label; })
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
})();
