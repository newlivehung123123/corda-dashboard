// Content sourced from CORDA_Methodology_Implementation.docx
// Structure: array of blocks. Each block: { type: 'h2'|'h3'|'p'|'table'|'note', ... }

export const previewBlocks = [
  {
    type: 'h2',
    text: '1. Theoretical framework',
  },
  {
    type: 'p',
    text: "We've structured our index around five theoretical drivers of democratic change: economic inequality and relative deprivation (D1), information environment shocks (D2), elite defection and intra-elite conflict (D3), state capacity erosion (D4), and polarisation and effective tribalism (D5). These drivers were selected on two grounds: each is well-established in the political sciences and comparative democratisation literature as a structural condition associated with democratic instability, and each has a theoretically coherent and constructable pathway through which AI can plausibly amplify the condition. We do not claim that these drivers are exhaustive — for example, religious, demographic, and geopolitical shocks have independent literature spheres — but they represent those drivers able to canvas the widest range of contributors to modern democratic stability and most exposed to AI-specific amplification mechanisms; the latter is the framework's stated analytical focus.",
  },
  {
    type: 'p',
    text: 'Consider the following descriptions and theoretical bases for each of the five drivers:',
  },
  {
    type: 'table',
    caption: 'Table 0. Theoretical drivers',
    head: ['Driver', 'Label', 'Primary theoretical basis', 'Relevance to democratic stability'],
    rows: [
      ['D1', 'Economic inequality & relative deprivation', 'Meltzer & Richard (1981); Piketty (2014); Acemoglu & Robinson (2012)', 'Material grievance generates redistribution pressure; when that pressure fails to translate into policy — through elite capture, collective action problems, or identity politics — it accumulates as a structural source of political volatility.'],
      ['D2', 'Information environment shocks', 'Prat & Strömberg (2013); Guriev & Treisman (2022)', 'Democratic accountability depends on the quality of the signal voters receive about leaders and policies; structural shocks to the information environment undermine the epistemic preconditions for that accountability, independently of citizens’ material conditions.'],
      ['D3', 'Elite defection & intra-elite conflict', 'Goldstone (1991); Turchin (2016, 2023)', 'Democratic arrangements lose their equilibrium not primarily because of mass mobilisation but because the coalition sustaining them fractures from within; the conditions for defection are structural, not ideational.'],
      ['D4', 'State capacity erosion', 'Besley & Persson (2011); Fukuyama (2011, 2014)', 'A state that cannot raise revenue effectively, enforce contracts impartially, or deliver public goods reliably cannot respond to the grievances the other drivers generate; erosion is self-reinforcing and can be deliberate as well as structural.'],
      ['D5', 'Polarisation & effective tribalism', 'Iyengar et al. (2019); Abramowitz (2010, 2018)', 'Sufficiently deep partisan divisions make democratic correction harder independently of policy content; when partisan identity becomes tribal, voters tolerate anti-democratic behaviour by co-partisans, and cross-partisan coalitions for institutional investment become structurally unavailable.'],
    ],
  },
  {
    type: 'image',
    src: 'https://cdn.jsdelivr.net/gh/newlivehung123123/corda-dashboard@51c7c21ffce1ae5975a25cc5ce78ed375bd94e33/public/figures/figure0.png',
    caption: 'Figure 0. Causal directed graph of the five theoretical drivers',
  },
];

export const fullBlocks = [
  {
    type: 'p',
    text: 'D1 — Economic inequality and relative deprivation is perhaps the most broadly accepted driver of political change in the comparative literature. Meltzer and Richard’s median-voter model establishes a self-correcting mechanism whereby, as the distribution of income widens and the median voter’s income falls relative to the mean, support for redistribution widens and democratic pressure encourages egalitarian policy correction. Acemoglu and Robinson identify why this correction fails in practice — collective action problems and elite capture prevent the majority preference from translating into tractable policy. Piketty’s r > g condition enriches the structural dimension: when returns to capital exceed economic growth, inequality deepens regardless of formal democratic procedures. We treat D1 as operating through relative deprivation rather than absolute poverty, given that the literature consistently links the perceived gap between deprivation and poverty to political volatility rather than material deprivation in and of itself.',
  },
  {
    type: 'p',
    text: 'D2 — Information environment shocks first follows from Prat and Strömberg’s premises established in their 2013 work: voters are rationally ignorant and rely on media as a substitute for costly information-gathering, making the quality of the information environment a structural precondition for accountability. Where the media is more plural and more competitive, voter knowledge is better and policy is more responsive. Guriev and Treisman extend this to its most consequential form, the spin dictator — an individual who maintains power not through outright repression but by systematically controlling observable signals to manufacture apparent legitimacy. D2 is structurally distinct from D1 in that economic deprivation creates conditions for democratic correction, whereas information deprivation can mask those conditions entirely or manufacture false ones.',
  },
  {
    type: 'p',
    text: 'D3 — Elite defection and intra-elite conflict operate at a more concentrated level than D1 and D2. Goldstone’s structural-demographic theory identifies three co-moving conditions for state breakdown: state fiscal distress (SFD), elite overproduction (or elite mobilisation potential, EMP), and popular mobilisation (MMP). The elite overproduction mechanism is load-bearing — when aspirants to elite positions grow faster than available positions, disaffected aspirants become available as political entrepreneurs willing to mobilise mass grievances. The mechanism is structural rather than ideational; defection follows from a shift in the payoff structure of loyalty, not from a shift in values. Turchin’s political stress indicator formalises this as a quantitative tracker of the same three components. Applying these indicators to contemporary, advanced democracies reveals expanded credentialed classes whose expectations outrun elite absorption as the defining stress condition.',
  },
  {
    type: 'p',
    text: 'D4 — State capacity erosion is decomposed by Besley and Persson into fiscal and legal components, modelled as stocks requiring active political investment to maintain. The core insight is that this investment is undersupplied under political conflict: each faction blocks capacity-building that a rival might turn against them, producing a coordination failure precisely when strong institutions are needed most. Fukuyama adds a decay mechanism, repatrimonialisation — the effect whereby impersonal institutions are progressively captured by insider networks. The vetocracy of accumulated veto players in mature democracies contributes a subtler but equally damaging form of erosion. D4 has an important asymmetric dimension with respect to AI: should AI increase coercive state capacity while simultaneously degrading accountability capacity, a single scalar score will miss this directional shift.',
  },
  {
    type: 'p',
    text: 'D5 — Polarisation and effective tribalism is distinguished from ideological polarisation by Iyengar and colleagues as partisan dislike/distrust independent of policy distance (affective polarisation). Affective polarisation has increased sharply in established democracies even while actual policy preferences have not comparably diverged — the divide is social and psychological rather than substantive, and therefore not self-corrective through policy convergence. Its consequence for democratic function is that tribal partisan identity generates tolerance for anti-democratic behaviour by co-partisans, severing the procedural norms on which accountability depends. Abramowitz adds a structural dimension: progressive sorting of racial, cultural, and ideological identities into party alignment has shrunk the ambivalent centre, shifting electoral incentives from persuasion to base mobilisation. This driver also acts as a cross-cutting amplifier, blocking coalitions that would address the conditions the other four drivers generate. Its internal consistency is notably lower than D1–D4 (α = 0.088 cross-sectional; 0.309 panel), reflecting genuine construct multidimensionality, addressed further in section 4.',
  },
  {
    type: 'h2',
    text: 'Justifying the inclusion of non-AI-specific indicators',
  },
  {
    type: 'p',
    text: 'The index includes both AI-specific indicators and non-AI-specific democratic health indicators. The latter are a structural requirement of the analytical framework.',
  },
  {
    type: 'p',
    text: 'The amplification framing fundamentally requires a baseline to amplify against. Our core analytical claim is that AI amplifies pre-existing structural drivers of instability. Testing an amplification claim requires measuring the driver and the amplifier independently — without non-AI baseline indicators, the composite would measure AI exposure rather than AI-conditioned democratic risk. This is a structural requirement of the regression analyses that test whether higher AI exposure scores predict deterioration in democratic health. Therefore, democratic health must be measured on its own terms, independently of the AI exposure variable.',
  },
  {
    type: 'p',
    text: 'The drivers have structural histories that predate AI. Anchoring the index in non-AI indicators allows us to inherit the construct validity of established democratic health measures — V-Dem, Freedom House, WJP, EIU, et cetera — that have been methodologically refined over many years and were designed specifically to operationalise the constructs our theoretical framework specifies. Building the index exclusively on AI-specific indicators would require constructing that validity from scratch, with shorter time series, more limited country coverage, and weaker theoretical anchoring.',
  },
  {
    type: 'p',
    text: 'These two indicator types serve distinct measurement functions. Non-AI indicators measure the current severity of each driver as a structural condition; AI-specific indicators measure the degree to which AI is present as an amplifier of that condition. Conflating them would make it impossible to distinguish a country with deep structural vulnerability and low AI exposure from one with moderate structural vulnerability and high AI exposure.',
  },
  {
    type: 'p',
    text: 'This dual structure does not resolve the underlying identification challenge, namely that AI exposure barely varies before 2023 and most cross-sectional variation is between countries rather than within them. What it does ensure is that the composite measures what it claims to: democratic risk conditioned by AI exposure, not AI exposure per se.',
  },

  { type: 'h2', text: '2. Data selection' },
  {
    type: 'p',
    text: 'The criteria for the indicators were relevance and validity. Relevance was assessed by establishing a clear link to our theoretical framework. Validity was assessed by evaluating each source’s reputation and methodological rigour.',
  },
  {
    type: 'p',
    text: 'At the initial selection stage, we did not panelise indicators with limited coverage. We selected all indicators that serve as a close proxy to the constructs in our theoretical framework. Two researchers worked independently to identify suitable indicators, one covering AI-specific and the other covering democratic health indicators. The table below shows the datasets surveyed at this stage.',
  },
  {
    type: 'table',
    caption: 'Table 1. Data sources surveyed',
    head: ['AI-specific indicators', 'Democratic health datasets'],
    rows: [
      ['CAIDP AI & Democratic Values Index', 'V-Dem'],
      ['GIRAI — Global Index on Responsible AI', 'EIU Democracy Index'],
      ['IMF AI Preparedness Index', 'Freedom House Freedom in the World'],
      ['Ipsos AI Monitor, OECD AI Incidents Monitor', 'Digital Society Project (DSP)'],
      ['Stanford AI Index', 'Transparency International CPI'],
      ['Tortoise Global AI Index', 'WJP Rule of Law Index'],
      ['World Bank GovTech Maturity Index (GTMI)', 'BTI — Bertelsmann Transformation Index'],
      ['Digital Society Project (DSP)¹', 'IBP Open Budget Survey'],
      ['OECD Truth Quest Survey, Reuters Institute Digital News Report', 'CIVICUS Monitor'],
      ['', 'IDEA GSoD — Global State of Democracy'],
      ['', 'RSF Press Freedom Index'],
    ],
  },
  {
    type: 'p',
    text: 'By the end of this stage, we had two types of indicators: 29 AI-specific indicators and 88 non-AI-specific (democratic health) indicators. The data integration process consolidated duplicated indicators (e.g. four V-Dem Digital Society Project variables present in both the AI and non-AI datasets).',
  },
  {
    type: 'p',
    text: 'The main challenge with AI indices is the lack of construct validity. The lack of AI-specific indicators made us rely on nearest proxies, which may not capture the underlying concept precisely. This suggests the need for new datasets based on observed indicators or expert sources for AI-specific democracy indicators.',
  },
  {
    type: 'p',
    text: 'Another challenge of using secondary sources is that each index has its own assumptions about construction, weighting, and aggregation. Accounting for the subjective judgment behind these indices, alongside our own assumptions, is important when interpreting our results.',
  },
  {
    type: 'p',
    text: 'In our cross-sectional data from 2023 to 2025, we use the latest value available for each country. This varies by country for the same indicator, and some indicators (such as WJP and WB GovTech) were last updated in 2021. These indicators did not have data after 2021, which raises a methodological limitation, as observations for a country may correspond to different points in time.',
  },

  { type: 'h2', text: '3. Imputation of missing data' },
  {
    type: 'p',
    text: 'For the selected indicators, we performed a missingness audit; an indicator was labelled as observed if it was reported for the country at least once.',
  },
  {
    type: 'p',
    text: 'Since there is no test to determine whether indicators are missing completely at random, we used logical judgment to classify variables as MNAR (Missing Not at Random) or MAR (Missing at Random).',
  },
  { type: 'h3', text: '3.1. Missing Not at Random (MNAR)' },
  {
    type: 'p',
    text: 'These are variables whose missingness depends on the values themselves. Data is missing because surveys did not include certain countries due to data collection feasibility, project scope, or deliberate decisions by the researchers. For AI indicators, we assume missingness can relate to limited AI exposure — for example, countries with limited AI policies and infrastructure may not be reported in AI-related indicators because they lack an AI ecosystem attractive for researchers to study. For MNAR variables, we did not perform imputation, to avoid introducing bias (JRC, 2025). The table below lists the variables we classify as MNAR and our rationale.',
  },
  {
    type: 'table',
    caption: 'Table 2. MNAR indicators',
    head: ['Source', 'Missing countries', 'Indicators affected'],
    rows: [
      ['GIRAI — Global Index on Responsible AI', 'Bangladesh, Denmark, Israel, Sweden', 'National AI Policy dimension score; Transparency and Explainability dimension score'],
      ['Ipsos AI Monitor', 'UAE, Bangladesh, Denmark, Ghana, Israel, Nigeria, Taiwan', '% AI will replace jobs'],
      ['Reuters Institute (AI sub-report)', 'All except Denmark, France, Japan, the UK, USA', '6 Reuters AI-and-news metrics'],
      ['OECD Truth Quest (TQ12)', 'Bangladesh, Chile, China, Denmark, Ghana, India, Indonesia, Israel, New Zealand, Nigeria, Singapore, South Africa, South Korea, Sweden, Taiwan, UAE', 'TQ12 — Truth Quest score by type: Disinformation (AI-generated)'],
      ['Stanford', 'All except Germany, Denmark, France, the UK, the Netherlands, Poland, Sweden, USA', 'Total Public Spending; Number of AI bills; % Trust AI not to discriminate'],
      ['OECD AI Incidents Monitor', 'Bangladesh, Chile, Denmark, Germany, Ghana, Indonesia, Nigeria, Poland, South Africa', 'AI Incidents count — presence-only system: absence means zero reported, not confirmed zero incidence'],
      ['BTI (Bertelsmann)', 'Australia, Canada, Denmark, France, Germany, Israel, Japan, Netherlands, New Zealand, Sweden, UK, USA', 'BTI by design covers only transformation/developing countries'],
      ['IBP Open Budget Survey', 'All except Bangladesh, Brazil, Chile, China, India, Indonesia', 'IBP samples only select countries per wave'],
      ['WJP Rule of Law', 'Israel, Taiwan', 'These two countries are not in the WJP scoring editions'],
      ['V-Dem election indicators', 'China', 'China holds no contested multiparty elections'],
    ],
  },
  { type: 'h3', text: '3.2. Missing at Random (MAR)' },
  {
    type: 'p',
    text: 'The only indicator we found to be missing at random — meaning the missingness does not depend on the variable of interest — was World Bank GovTech. This indicator reports data every two years; the observed waves were 2020, 2022, and 2025. We used linear imputation to handle the missing values. As with all imputation techniques, this risks underestimating variance, since imputed values are later treated as actual values. We accounted for this in the sensitivity analysis, where we used the actual values with no imputation and found no impact on the final ranking.',
  },
  {
    type: 'p',
    text: 'After data imputation, we applied a ≤ 30% threshold for acceptable missingness (≥ 19/27 countries). Of our 118 indicators, 93 passed the threshold and 25 were deleted. The rationale for this relatively permissive threshold is the small sample size (27 countries): a stricter threshold would skew the index toward data-dense countries, which may already have comparative advantages in the AI race (e.g. income level, AI infrastructure), while excluding indicators that are conceptually useful (e.g. AI deepfake indicators in the cross-sectional setting) but less widely reported.',
  },
  { type: 'h3', text: '3.3. Country-level missingness audit' },
  {
    type: 'p',
    text: '10 of the 27 countries have missing data in the final selected indicators. This is an important caveat when interpreting the scores of these countries. As described in the weighting section, we use partial weighting for countries with missing values. The country-level missingness audit is reported below.',
  },
  {
    type: 'table',
    caption: 'Table 3. Country-level missingness',
    head: ['Country', 'Missing count', '% missing', 'CORDA rank'],
    rows: [
      ['Israel', '10', '12.20%', '16'],
      ['Bangladesh', '8', '9.76%', '26'],
      ['Denmark', '7', '8.53%', '1'],
      ['Taiwan', '6', '7.32%', '11'],
      ['Sweden', '5', '6.10%', '2'],
      ['Ghana', '3', '3.66%', '19'],
      ['United Arab Emirates', '3', '3.66%', '25'],
      ['Nigeria', '3', '3.66%', '24'],
      ['China', '3', '3.66%', '27'],
      ['Indonesia', '1', '1.22%', '21'],
    ],
  },

  { type: 'h2', text: '4. Multivariate analysis' },
  {
    type: 'p',
    text: 'Cronbach’s alpha was used to measure the eligibility of indicators within a dimension by assessing how well they measure the same unidimensional construct (JRC, 2005). A 0.7 threshold was used to determine indicator eligibility. Cronbach’s alpha is calculated as:',
  },
  { type: 'formula', text: 'α = Q/(Q−1) × (1 − Σ Var(xⱼ) / Var(x₀))' },
  {
    type: 'list',
    items: [
      'Q = the total number of indicators/items in the driver',
      'xⱼ = the score of indicator j',
      'x₀ = the total combined score across all indicators from 1 up to j (Σ xⱼ)',
      'Var(xⱼ) = the variance of indicator j',
      'Var(x₀) = the variance of the total combined score across all Q indicators',
    ],
  },
  {
    type: 'p',
    text: 'We performed the test on both cross-sectional and panel data. The table below presents the results.',
  },
  {
    type: 'table',
    caption: 'Table 4. Internal consistency results',
    head: ['Driver', 'CS N complete', 'Panel N', 'α (CS)', 'Interpretation'],
    rows: [
      ['D1 Economic Inequality', '17', '351', '0.941', 'High internal consistency with possible redundancy'],
      ['D2 Information Environment', '20', '81', '0.943', 'High internal consistency with possible redundancy'],
      ['D3 Elite Defection', '21', '0', '0.920', 'High internal consistency with possible redundancy'],
      ['D4 State Capacity', '19', '0', '0.957', 'High internal consistency with possible redundancy'],
      ['D5 Polarisation', '27', '459', '0.088', 'Low internal consistency, suggesting separation in the panel phase'],
    ],
  },
  {
    type: 'p',
    text: 'To understand how indicators within a dimension relate to one another, we calculated the correlation of indicators with one another, using:',
  },
  { type: 'formula', text: 'r_XY = Cov(X,Y) / (σ_X × σ_Y)' },
  {
    type: 'list',
    items: [
      'Cov(X, Y) = the covariance between variables X and Y — whether they tend to move together',
      'σ_X = standard deviation of X',
      'σ_Y = standard deviation of Y',
    ],
  },
  {
    type: 'p',
    text: 'For indicator pairs with r > 0.9, we assume potential redundancy and assess the potential for consolidation. The number of redundant pairs per driver is shown below.',
  },
  {
    type: 'table',
    caption: 'Table 5. Redundant pairs (r > 0.9) within drivers',
    head: ['Driver', 'Redundant pairs'],
    rows: [
      ['D1 Economic Inequality', '2'],
      ['D2 Information Environment', '15'],
      ['D3 Elite Defection', '18'],
      ['D4 State Capacity', '29'],
    ],
  },
  {
    type: 'p',
    text: 'Based on this analysis, in Driver 1 we removed v2xeg_eqprotec (Equal Protection Index) and retained v2x_egal (Egalitarian Component Index), as the latter is the broader composite of which the former is a part.',
  },
  {
    type: 'p',
    text: 'In Driver 4, we removed CIVICUS Civic Space Rating and retained CIVICUS Civic Space Score, as they measure the same construct on different scales. To avoid multicollinearity, we also removed WJP Factors 2, 6, 7, and 8 and retained the composite WJP Rule of Law Index Overall Score.',
  },
  {
    type: 'p',
    text: 'We are careful not to over-interpret these results, as a high alpha coefficient does not necessarily indicate unidimensionality — it may instead reflect highly correlated indicators (JRC, 2025). A limitation of our correlation analysis is that we compare indicators within a driver but not across drivers; statistical clustering methods could in principle verify our groupings, but the limited sample size makes this unreliable.',
  },

  { type: 'h2', text: '5. Normalisation' },
  {
    type: 'p',
    text: 'Normalisation is needed because indicators have different measurement units and scales. Indicators with a larger scale would otherwise carry more weight than those with a smaller scale in the aggregated score — relevant here, since our indicators range from 0–1 to 0–100. Min-max normalisation also preserves the proportional relationship between values by rescaling the distribution within new minimum and maximum bounds. The normalised value is calculated as:',
  },
  { type: 'formula', text: "X' = (X − min(A)) / (max(A) − min(A)) × (max' − min') + min'" },
  {
    type: 'list',
    items: [
      "X' = the normalised (rescaled) value",
      'X = the original value',
      'min(A) = the smallest value in the original dataset/indicator',
      'max(A) = the largest value in the original dataset/indicator',
      "max' = the highest value on the new scale (100)",
      "min' = the lowest value on the new scale (0)",
    ],
  },
  {
    type: 'p',
    text: 'The global minimum and maximum were computed across all countries and all years to allow temporal comparability of scores. For negative values (e.g. all V-Dem/DSP Bayesian interval estimates), the observed global minimum was used regardless of sign, as such values are not otherwise suitable for min-max normalisation.',
  },
  {
    type: 'p',
    text: 'Before normalising, we unified the direction of all indicators, reversing the scale for indicators associated with democratic risks so that a higher number always indicates better democratic health.',
  },
  {
    type: 'table',
    caption: 'Table 6. Reversed indicators',
    head: ['Indicator', 'Why reversed'],
    rows: [
      ['% AI Will Replace Jobs (Ipsos)', 'A higher score means more agreement, indicating public concern about AI job displacement and therefore higher exposure'],
      ['OECD AI Incidents Monitor', 'A higher count of AI deepfake incidents relates to higher exposure to information shocks'],
      ['AI Companies (Tortoise)', 'A composite measure of how developed a country’s AI sector is; a higher value may indicate higher AI risk exposure'],
      ['AI Funding (Tortoise)', 'A composite measure of AI funding; a higher value may indicate the possibility of new economic AI elites relative to existing elites'],
      ['RSF Press Freedom Score', 'A lower number refers to a freer press'],
      ['v2x_corr: Political Corruption Index', 'A higher score means more corruption'],
      ['v2x_neopat: Neopatrimonial Rule Index', 'A higher score means more neopatrimonial rule'],
      ['v2caautmob: Mobilisation for Autocracy', 'A higher score means more mobilisation for autocracy, indicating higher autocracy initially'],
      ['v2cacamps: Political Polarisation', 'A higher score means higher polarisation'],
    ],
  },

  { type: 'h2', text: '6. Weighting and aggregation' },
  {
    type: 'p',
    text: 'We applied equal weighting across drivers, with each driver contributing 20%. Within each driver, we applied partial weighting: the weight of each indicator equals 1/n, where n is the number of available indicators within that driver. The table below lists the weight assigned to each driver and its constituent indicators.',
  },
  {
    type: 'table',
    caption: 'Table 7. Weighting details',
    head: ['Driver', 'Driver weight', 'Indicators per driver', 'Weight per indicator'],
    rows: [
      ['D1 Economic Inequality', '20%', '9', '11.11%'],
      ['D2 Information Environment', '20%', '21', '4.76%'],
      ['D3 Elite Defection', '20%', '21', '4.76%'],
      ['D4 State Capacity', '20%', '22', '4.55%'],
      ['D5 Polarisation', '20%', '9', '11.11%'],
    ],
  },
  {
    type: 'p',
    text: 'An important note on partial weighting: when data is missing for a given indicator, its weight becomes 0, redistributed proportionally among the remaining available indicators in that driver. We apply this to avoid penalising countries for missing data. The limitation of this approach is that, depending on the missing indicator’s typical direction, it can either over- or under-state a country’s position — for example, if a missing indicator typically reflects risk exposure, the final score may overestimate the country’s readiness; if it typically reflects readiness, partial weighting may instead penalise the country. This creates compatibility constraints between countries with different amounts of missing data, as shown in the country-level missingness table above. Moreover, because the number of indicators per driver varies, indicators in Drivers 1 and 5 individually carry more influence over the index score than indicators in Drivers 2, 3, or 4.',
  },

  { type: 'h2', text: '7. Uncertainty and sensitivity analysis' },
  {
    type: 'p',
    text: 'To account for uncertainty around design decisions related to imputation, normalisation, and weighting, we tested several variants of the index against the original. For MAR imputation, instead of linear interpolation, we deleted the column and observed the difference in ranking; we also constructed a variant excluding Ipsos indicators, which had the highest missingness (20/27) among the final selected indicators. The index ranks were fully robust (Kendall’s τ = 1.0000) to changes in imputation. For normalisation, we tried Z-scores instead of min-max normalisation; rankings were robust and largely insensitive (Kendall’s τ = 0.9829) to the change.',
  },
  {
    type: 'p',
    text: 'For weighting, beyond equal weighting (Specification A), we defined two further specifications:',
  },
  {
    type: 'list',
    items: [
      'Specification A: Equal weights across all drivers — each driver contributes 20%.',
      'Specification B: A higher weight (30%) for Driver 2 (Information Environment Shocks), with the other drivers each weighting 17.5%, on the assumption that its impact is higher than the others.',
      'Specification C: A higher weight (30%) for Driver 4 (State Capacity Erosion), with the other drivers each weighting 17.5%, on the assumption that state capacity should be given more attention when assessing AI’s impact on democracy.',
      'We also used PCA-derived weights².',
    ],
  },
  {
    type: 'p',
    text: 'Comparing each specification’s ranking against our equal-weighting ranking, the index ranks remained stable and robust across all specifications (Kendall’s τ between 0.9487 and 0.9829).',
  },
  {
    type: 'p',
    text: 'For aggregation, the major limitation of linear (additive) aggregation is that it allows compensation — a high score on one driver can offset a low score on another. The geometric mean addresses this by penalising variation across driver scores (JRC, 2005). Implementing geometric aggregation shifted New Zealand’s rank from 10th to 19th (Kendall’s τ = 0.7835): New Zealand’s Driver 5 (Polarisation/Affective Tribalism) score is 51.8, while its other four drivers range from 67 to 85.',
  },
  {
    type: 'p',
    text: 'All sensitivity tests confirmed the high robustness of our index, with the exception of the aggregation test, which revealed some instability for New Zealand and, to a lesser extent, Sweden. The table below summarises each test, its Kendall’s τ, and the number of countries whose rank shifted by more than 5 places.',
  },
  {
    type: 'table',
    caption: 'Table 8. Sensitivity test results',
    head: ['Test', "Kendall's τ vs primary", 'Countries shifting > 5 ranks'],
    rows: [
      ['T1: Z-score vs min-max normalisation', '0.9829', '0'],
      ['T2: Geometric vs linear aggregation', '0.7835', '1 (New Zealand)'],
      ['T3b: Spec B — D2 = 30% (information-heavy)', '0.9487', '0'],
      ['T3c: Spec C — D4 = 30% (capacity-heavy)', '0.9829', '0'],
      ['T4: No imputation (WB GovTech observed only)', '1.0000', '0'],
      ['T5: Borderline Ipsos indicators excluded', '1.0000', '0'],
      ['T6 (new): PCA weights vs equal weights', '0.9715', '0'],
    ],
  },
  {
    type: 'note',
    text: '² PCA performance is not stable for Driver 3 and Driver 4 due to sample size, and when applied to panel data for Drivers 1 and 2 it excludes AI-only indicators.',
  },

  { type: 'h2', text: '8. Links to other indicators' },
  {
    type: 'p',
    text: 'In the table below, we compare our index with two AI governance indicators — Oxford Insights GIARI and CAIDP — chosen because they show the closest conceptual link to assessing countries’ readiness for democratic AI risks.',
  },
  {
    type: 'table',
    caption: 'Table 9. Comparison with other indicators',
    head: ['', 'Oxford Insights GIRAI', 'CAIDP'],
    rows: [
      ['Focus', 'Government AI readiness', 'Human rights-based benchmark to assess countries’ capacities'],
      ['Dimensions', 'Policy capacity, AI governance, AI infrastructure, public sector adoption, diffusion, and resilience', 'Responsible AI capacities, human rights, and responsible AI governance — 12 questions, each scored Y/N/P based on an analysis of a country’s AI commitments and governance'],
      ['What’s missing?', 'Focuses on government readiness rather than societal readiness; assumes the goodwill of the state. For us, this means it does not capture the readiness of authoritarian governments to use AI in ways that create high democratic risk. It also assumes public-sector AI adoption correlates with government readiness, without accounting for AI eroding state capacity through gradual decision-making automation. Its optimistic framing of AI infrastructure overlooks the possibility that such infrastructure contributes to AI power concentration.', 'Focuses on preparedness rather than exposure; even within readiness, AI’s impact on the information environment and its integration into the public sector are not addressed. It assumes current AI policies account for democratic risks from AI (e.g. economic inequality, information environment). UDHR commitment may give insight into a country’s propensity to misuse AI, but for countries with visible UDHR commitment, AI power concentration may still produce new forms of human rights violations. The 3-value scale for assessing commitment and implementation is also too coarse to identify small differences between countries.'],
    ],
  },

  { type: 'h2', text: '9. Visualisation of the results' },
  { type: 'h3', text: 'Tool interface overview' },
  {
    type: 'p',
    text: 'The interface enables users to customise their view based on their preferences and interests. It offers three main data views: a ranking view as stacked bar charts; a two-axis scatter plot for comparing different drivers with each other or with the overall score; and a world map. The world map view allows users to click a country to review its score, with the colour intensity corresponding to the democratic health level (darker navy indicating better performance). Users can choose to view the composite score or individual driver scores.',
  },
  {
    type: 'image',
    src: 'https://cdn.jsdelivr.net/gh/newlivehung123123/corda-dashboard@51c7c21ffce1ae5975a25cc5ce78ed375bd94e33/public/figures/figure1.png',
    caption: 'Figure 1. CORDA Dashboard filter',
  },
  {
    type: 'image',
    src: 'https://cdn.jsdelivr.net/gh/newlivehung123123/corda-dashboard@51c7c21ffce1ae5975a25cc5ce78ed375bd94e33/public/figures/figure2.png',
    caption: 'Figure 2. CORDA rankings — stacked bar view',
  },
  {
    type: 'image',
    src: 'https://cdn.jsdelivr.net/gh/newlivehung123123/corda-dashboard@51c7c21ffce1ae5975a25cc5ce78ed375bd94e33/public/figures/figure3.png',
    caption: 'Figure 3. CORDA rankings — scatter plot view',
  },
  {
    type: 'image',
    src: 'https://cdn.jsdelivr.net/gh/newlivehung123123/corda-dashboard@51c7c21ffce1ae5975a25cc5ce78ed375bd94e33/public/figures/figure4.png',
    caption: 'Figure 4. CORDA world map view',
  },

  { type: 'h2', text: 'Note on AI usage' },
  {
    type: 'p',
    text: 'Large language models were used to help extract indicators for initial screening, which may introduce biases reflecting their training data. Claude Cowork was also used in data preprocessing, verification, and dashboard coding via a customised pipeline.',
  },

  { type: 'h2', text: 'References' },
  {
    type: 'p',
    text: 'JRC / Nardo, M., Saisana, M., Saltelli, A., & Tarantola, S. (2005). Tools for Composite Indicators Building. EUR 21682 EN. European Commission Joint Research Centre.',
  },
  {
    type: 'note',
    text: '¹ DSP appears twice because of a structural duplication in the indicators used for D5, later resolved during data integration.',
  },
];
