export const indexSummary =
  "The CORDA Democratic AI-Readiness Index measures the vulnerability of 27 democracies and near-democracies to AI-amplified democratic backsliding, scoring each country across five theoretical drivers of democratic erosion using 82 verified indicators.";

export const theoreticalFramework =
  "The CORDA index is organised around five theoretical drivers of democratic backsliding, each operationalised with both AI-specific and non-AI background indicators. The AI-specific indicators capture how AI amplifies the underlying driver; the non-AI indicators establish the baseline democratic health context in which amplification occurs.";

export const driverTable = [
  {
    code: "D1",
    driver: "Economic Inequality / Relative Deprivation",
    theoryBasis: "Meltzer & Richard (1981); Acemoglu & Robinson (2006); Piketty (2014)",
    aiVector: "Labour displacement, wage polarisation",
  },
  {
    code: "D2",
    driver: "Information Environment Shocks",
    theoryBasis: "Prat & Strömberg (2013); Guriev & Treisman (2022)",
    aiVector: "Synthetic media, algorithmic curation, micro-targeting",
  },
  {
    code: "D3",
    driver: "Elite Defection / Intra-Elite Conflict",
    theoryBasis: "Goldstone (1991); Turchin (2016); Levitsky & Ziblatt (2018)",
    aiVector: "Winner-take-all capital accumulation, elite fragmentation",
  },
  {
    code: "D4",
    driver: "State Capacity Erosion",
    theoryBasis: "Besley & Persson (2011); Fukuyama (2011)",
    aiVector: "AI outpacing regulatory capacity; regulatory arbitrage",
  },
  {
    code: "D5",
    driver: "Polarization / Affective Tribalism",
    theoryBasis: "Iyengar et al. (2019); Abramowitz (2018); V-Dem",
    aiVector: "Recommender-system amplification; filter bubbles",
  },
];

export const pipelineSteps = [
  {
    step: 1,
    title: "Step 1 — Checking What Data Actually Exists",
    bullets: [
      "We started by auditing every single data point across all 27 countries and 117 indicators — over 3,100 country–indicator combinations in total.",
      "86.2% of those combinations had real, observed data. That means the overwhelming majority of scores in this index are drawn directly from published sources, not estimated or filled in.",
      "The remaining 13.8% of data points were missing — but for clearly understood structural reasons. For example, the Bertelsmann Transformation Index deliberately does not score established Western democracies like Germany or Australia (it focuses on countries undergoing political transition). Similarly, the WJP Rule of Law Index does not publish scores for Israel or Taiwan. These are not gaps in our data collection — they show deliberate choices by the original data producers, classified as Missing Not At Random (MNAR). MNAR data cannot be imputed: fabricating a score where none exists would introduce systematic bias.",
      "A small set of 81 data points from the World Bank GovTech survey were missing simply because that survey runs every two to three years rather than annually. Because this missingness is entirely due to survey timing rather than any country characteristic, these 81 gaps are classified as Missing At Random (MAR) and are eligible for data imputation — see Step 3. All other missing data was left blank.",
    ],
  },
  {
    step: 2,
    title: "Step 2 — Deciding Which Indicators to Include",
    bullets: [
      "Not all 117 indicators collected were suitable for scoring every country. An indicator that only covers 5 of 27 countries cannot fairly contribute to a global ranking — it would effectively penalise or reward countries based on whether they happened to be surveyed.",
      "We applied a coverage threshold: an indicator needed data for at least 19 of 27 countries (70% coverage, meaning no more than 30% missing) to be included in the composite scores. This is more permissive than the Oxford Insights Government AI Readiness Index, which excludes any indicator missing for more than 15% of its country sample. We relaxed the threshold to 30% because a strict 15% cut-off would have eliminated most AI-specific indicators — many of which cover 20–23 of 27 countries — given the small country sample of 27.",
      "93 indicators passed this coverage screen: 20 AI-specific and 73 democracy health indicators. Three further reductions then brought the final composite down to 82 indicators. First, one Freedom House indicator assigned to two drivers was deduplicated (93 → 92). Second, four V-Dem Digital Society Project variables present in both the AI and non-AI layers were consolidated into a single version each (92 → 88). Third, six near-perfect duplicate pairs — for example, four separate WJP rule-of-law sub-factors that correlate above 0.93 with the overall WJP Rule of Law score — were removed in favour of the composite measure (88 → 82). The authoritative list of the final 82 indicators is in step6_weights.csv.",
      "The 25 indicators that failed the coverage screen are still available for descriptive country profiles but do not affect any ranking.",
      "Independently of the composite eligibility question, we also assessed all 118 indicators for longitudinal eligibility — whether they have enough years of data for trend analysis (at least five years). This is a separate criterion: an indicator can fail the coverage screen but still have a long time series (e.g. the OECD AI Incidents Monitor covers only 18 of 27 countries but spans eight years), or pass the coverage screen but have only one year of data (e.g. the Tortoise AI scores). Across all 118 indicators, 90 meet the longitudinal threshold: 6 AI-specific and 84 democracy health indicators. These 90 are designated for the panel regression, growth curve, and difference-in-differences analyses planned for the accompanying research paper.",
    ],
  },
  {
    step: 3,
    title: "Step 3 — Filling Specific Gaps in the Data",
    bullets: [
      "This step applied data imputation only to the 81 WB GovTech cells identified as Missing At Random (MAR) in Step 1. No other imputation was performed. The 441 MNAR cells — where data is absent because a source deliberately excludes certain countries — were left blank throughout the entire pipeline.",
      "The imputation method used was linear interpolation: for years sitting between two observed WB GovTech survey waves, we drew a straight line between the two nearest real values and read off the in-between estimate. For example, if a country scored 0.81 in 2022 and 0.99 in 2025, the imputed 2023 value is approximately 0.87 and the 2024 value approximately 0.93.",
      "A sensitivity test in Step 8 confirmed that removing all imputed values and using only the three observed WB GovTech waves produced identical country rankings (Kendall τ = 1.000). The imputation therefore had zero effect on final scores and was included solely for methodological completeness in the longitudinal dataset.",
    ],
  },
  {
    step: 4,
    title: "Step 4 — Putting All Indicators on the Same Scale",
    bullets: [
      "The 93 indicators used in scoring come from 15 different data sources, each using a different measurement scale. Freedom House scores countries on a 0–4 scale; V-Dem uses a 0–1 probabilistic scale; the Corruption Perceptions Index uses 0–100; some indicators are simple counts.",
      "To make these comparable, we rescaled every indicator to a common 0–100 range, where 0 represents the worst observed value across all 27 countries and all years, and 100 represents the best. This is called min-max normalisation and is the standard approach used by Oxford Insights, Tortoise, and other leading index producers.",
      "We also checked the direction of seven indicators that were originally coded the wrong way round — for example, the RSF Press Freedom score where a lower number means a freer press. For these seven, we reversed the scale before normalising, so that a higher CORDA score always means better democratic health or greater AI readiness.",
    ],
  },
  {
    step: 5,
    title: "Step 5 — Testing Whether Indicators Measure What They Should",
    bullets: [
      "Before combining indicators into driver scores, we tested whether the indicators assigned to each driver actually measure the same underlying concept. A driver built from indicators that have nothing to do with each other would produce a meaningless score.",
      "We used a standard statistical measure called Cronbach's alpha (α), which runs from 0 to 1. A score above 0.70 confirms the indicators are measuring a coherent shared concept. Drivers D1 through D4 all scored above 0.90 — very high consistency.",
      "Driver D5 (Polarisation / Affective Tribalism) scored only 0.31, which tells us that the nine indicators in this driver — including online hate speech, political violence, civil society participation, democratic culture, and societal polarisation, among others — are not measuring the same thing. This is expected: polarisation takes many forms, and a single number cannot honestly collapse all of them. We apply equal weighting within D5 and flag in the research paper that D5 should eventually be reported as two separate sub-scores (online polarisation, and democratic culture / civil society). That split is planned for the forthcoming research paper and not yet implemented in the dashboard.",
      "We also identified and removed near-duplicate indicators (pairs correlating above 0.97) to avoid counting the same construct twice.",
    ],
  },
  {
    step: 6,
    title: "Step 6 — Deciding How Much Each Indicator Counts",
    bullets: [
      "Within each of the five drivers, every qualifying indicator is given equal weight. If Driver 1 contains nine indicators, each contributes one-ninth of that driver's score. No single indicator dominates.",
      "Across the five drivers, each driver contributes exactly 20% to the overall CORDA score — the index does not treat economic inequality as more important than, say, state capacity, or vice versa.",
      "As a sensitivity test (Test 6 in our robustness analysis), we replaced equal weighting with principal component analysis (PCA) — a more mathematically complex method that assigns higher weight to indicators that explain more variance across countries. PCA weights produced rankings with a 97.2% rank-order correlation against equal weighting (Kendall τ = 0.9715), with no country shifting more than five positions. Equal weighting is therefore both simpler and equally valid.",
    ],
  },
  {
    step: 7,
    title: "Step 7 — Calculating the Final Scores",
    bullets: [
      "Each country's score on a given driver is the simple average of its normalised scores across all indicators in that driver, counting only indicators where data is actually available for that country.",
      "The overall CORDA Index score for each country is the simple average of its five driver scores. Because each driver is weighted equally at 20%, this is mathematically equivalent to summing all indicator scores and dividing by the effective number of indicators.",
      "All 27 countries receive a complete composite score because every country has data for all five drivers. No country is excluded from the ranking.",
      "We also calculated scores for every year from 2000 to 2025 to produce historical democratic health trajectories. These longitudinal scores use only the indicators with long-run time series — primarily V-Dem, Freedom House, EIU, and IDEA data — and are used in the research paper's trend analyses.",
    ],
  },
  {
    step: 8,
    title: "Step 8 — Checking Whether the Rankings Hold Up",
    bullets: [
      "Any index involves methodological choices — which normalisation method, how to weight indicators, whether to fill gaps. We tested whether different reasonable choices would produce substantially different rankings.",
      "Using z-score standardisation instead of our 0–100 rescaling: rankings changed by less than 2% (correlation with primary ranking: 98.3%). The choice of normalisation method does not matter.",
      "Using a stricter averaging formula that penalises imbalanced profiles (geometric mean): rankings changed more substantially for one country — New Zealand drops 10 places because its Polarisation driver score (53.7) is notably lower than its other four drivers (67–85). The arithmetic mean we use smooths over this imbalance; the geometric mean amplifies it. We report this openly.",
      "Removing the imputed World Bank data entirely: rankings were identical (100% correlation). The interpolated data points have zero effect on country rankings.",
      "Changing the weighting so that Information Environment or State Capacity counts for 30% instead of 20%: no country shifted more than five places. The equal weighting is robust.",
      "In summary: the CORDA rankings are stable across all tested alternatives except the choice of aggregation formula for New Zealand specifically. We report this openly and recommend readers note New Zealand's D5 score alongside its overall rank.",
    ],
  },
];

export const dataSources = [
  { source: "V-Dem / Digital Society Project",     indicators: 25, yearRange: "2000–2025", countries: "27/27" },
  { source: "Freedom House FIW",                    indicators: 10, yearRange: "2012–2024", countries: "27/27" },
  { source: "EIU Democracy Index",                  indicators: 4,  yearRange: "2006–2024", countries: "27/27" },
  { source: "IDEA GSoD",                            indicators: 7,  yearRange: "2000–2024", countries: "27/27" },
  { source: "Tortoise Global AI Index",             indicators: 4,  yearRange: "2024",      countries: "27/27" },
  { source: "GIRAI (Global Index on Responsible AI)", indicators: 5, yearRange: "2024",     countries: "23/27" },
  { source: "IMF AI Preparedness Index",            indicators: 1,  yearRange: "2023",      countries: "27/27" },
  { source: "World Bank GovTech GTEI",              indicators: 1,  yearRange: "2020–2025", countries: "27/27" },
  { source: "CAIDP AI & Democratic Values Index",   indicators: 1,  yearRange: "2023–2026", countries: "27/27" },
  { source: "Ipsos AI Monitor",                     indicators: 2,  yearRange: "2023–2025", countries: "20/27" },
  { source: "CIVICUS Monitor",                      indicators: 1,  yearRange: "2018–2025", countries: "27/27" },
  { source: "Transparency International CPI",       indicators: 1,  yearRange: "2012–2024", countries: "27/27" },
  { source: "RSF Press Freedom Index",              indicators: 1,  yearRange: "2013–2021", countries: "27/27" },
  { source: "WJP Rule of Law Index",                indicators: 3,  yearRange: "2012–2021", countries: "25/27" },
  { source: "Stanford AI Index",                    indicators: 2,  yearRange: "2023–2025", countries: "23/27" },
];

export const dataLimitations = [
  "Press freedom scores (Reporters Without Borders) and rule-of-law scores (World Justice Project) in this edition are drawn from 2021 data — the most recent editions of those surveys available in our dataset at the time of publication. Both organisations publish updates annually; future editions of CORDA will incorporate more recent releases.",
  "The United Arab Emirates does not hold multiparty elections, and the V-Dem project — our primary democracy data source — stopped scoring the UAE on the 'Opposition Parties Autonomy' indicator after 2019 for this reason. The UAE's score on that specific indicator therefore draws on 2019 data. All other UAE indicators use current data.",
  "Bangladesh's score on the 'Legislative Constraints on the Executive' indicator uses data from 2000 due to a data extraction gap identified during our pipeline audit. This affects Bangladesh's State Capacity driver score (D4) and is flagged as a known limitation pending correction in the next data release.",
];

export const analyticalMethods = [
  {
    id: "m1",
    title: "Method 1 — Does Higher AI Exposure Predict Democratic Decline?",
    bullets: [
      "Using 25 years of democracy data (2000–2025) across all 27 countries, we test whether countries with higher AI exposure scores have experienced faster deterioration in democratic health indicators.",
      "The statistical model accounts for the fact that some countries were always stronger democracies (e.g. Denmark) and that global events like the 2008 financial crisis affected all countries simultaneously. By controlling for these background factors, we isolate the specific association between AI exposure and democratic health change.",
      "This is the primary empirical method in the accompanying research paper. It does not prove that AI causes democratic decline — it tests whether the two are statistically associated after accounting for other explanations.",
    ],
  },
  {
    id: "m2",
    title: "Method 2 — Are High-AI-Exposure Countries Declining Faster Over Time?",
    bullets: [
      "This method asks a more specific question: do countries with higher AI exposure scores have steeper downward trends in democracy over 2000–2025, compared to countries with lower exposure?",
      "We model each country's democratic health as a trajectory — starting level in 2000, and rate of annual change — and then test whether AI exposure scores predict a faster rate of decline.",
      "Think of it as asking: among all 27 countries, do the ones most exposed to AI risks show a more pronounced 'slope downward' in their democracy scores over the past 25 years?",
    ],
  },
  {
    id: "m3",
    title: "Method 3 — Did AI Accelerate Democratic Decline After 2023?",
    bullets: [
      "Large language models became widely accessible to the public from late 2022 onwards. This method tests whether democratic health deteriorated faster in high-AI-exposure countries after 2023 compared to before — and whether that deterioration was larger than for low-exposure countries over the same period.",
      "We divide countries into two groups: those with above-average AI exposure scores (higher risk) and those below average (lower risk). We then compare how democracy scores changed in both groups before and after 2023.",
      "If the high-exposure group deteriorated more sharply after 2023 than before, and more sharply than the low-exposure group, that is evidence consistent with AI amplifying democratic backsliding in the post-LLM era.",
    ],
  },
  {
    id: "m4",
    title: "Method 4 — What Might Democracy Look Like in 2030?",
    bullets: [
      "Using the statistical relationships estimated in Method 1, we project forward to 2030 under three scenarios: one where AI's impact on society stays at 2025 levels, one where it grows moderately, and one where it grows rapidly.",
      "These are not predictions. They are conditional projections — they say 'if the relationship between AI exposure and democratic health continues as estimated, and if AI exposure grows at this rate, then democracy scores might fall within this range by 2030.'",
      "Results are presented as ranges rather than single numbers, making the uncertainty visible. This approach is modelled on how climate scientists present future projections: honest about uncertainty, but still analytically useful for policy planning.",
    ],
  },
  {
    id: "m5",
    title: "Method 5 — Case Studies: Did CORDA Predict Known Backsliders?",
    bullets: [
      "As a validation check, we examine three countries known to have experienced significant democratic backsliding in recent years — Hungary, Turkey, and Brazil under Bolsonaro (2019–2022) — and test whether the CORDA index would have identified them as high-risk.",
      "For each country, we construct a statistical 'twin' — a combination of comparison countries that looked similar in democratic health before backsliding began — and measure how far the actual country diverged from its twin after the backsliding period.",
      "If CORDA's driver scores effectively capture the mechanisms of democratic erosion, countries that subsequently backslid should have had notably higher risk scores before the backsliding occurred. This is a research-paper-only analysis, not shown in the dashboard.",
    ],
  },
];
