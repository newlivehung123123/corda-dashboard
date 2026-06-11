import React from 'react';

const paragraphs = [
  "AI's societal impact, ranging from shaping the information environment to the concentration of power associated with AI development, has the potential to affect the democratic level of different countries. Without sufficient guidelines, AI will contribute to democratic backsliding rather than advancing democracies.",
  "We teamed up as CORDA research fellows under the mentorship of Coleman Snell to figure out a way of extending existing democratic health indices (e.g., V-Dem, Freedom House, EIU Democracy Index, RSF, IDEA, WJP) to capture AI threat environments. We think these indices lack indicators capturing whether democracies are structurally equipped and prepared to govern AI before harms become irreversible. This is because, as currently constructed, these democracies assume pre-AI democracy signals will remain the same after the adoption of AI. For us, traditional democracy signals become insufficient when AI introduces new mechanisms to amplify drivers of political change, including economic deprivation, information environment shocks, elite defection, state capacity erosion, and polarization. We believe AI can influence them via job displacement, synthetic media generation, AI outpacing regulatory capacity, automated governance paralysis, and the production of AI elites. Moreover, current AI governance indices fail to capture these risks. In sum, having these concerns has led us to believe that measuring AI-related signals would give beneficiaries (including researchers, policy experts and industry professionals) useful insights for assessing global countries’ exposure and readiness for democratic AI risks. Overall, our objective is designing this AI-readiness index project, followed by building democratic AI amplified backsliding predictions. These predictions can give warning signals before harm becomes irreversible.",
  "In our methodology, we attempted to follow the guidelines of the OECD composite indicators regarding data imputation, normalisation, weighting, aggregation, and sensitivity testing. That said, we are open to discussions about our theoretical framing and the methodological decisions we made in constructing the index. It’s important to note that a mix of both AI-specific indicators and general democratic health indicators was used to serve as a proxy for a country’s exposure and readiness to democratic AI risks. While these indicators were helpful in constructing a proof of concept, we think there is high value in producing original scores for the drivers. Our decision is driven by the limited signals for some of the democratic risks we are interested in.",
  "We thank Jeba Sania for her feedback on our measurement uncertainties. We are also grateful to the CORDA team for setting the structural constraints that helped us channel our efforts and experiences to work on this project.",
];

export default function MissionVision() {
  return (
    <section id="mission-vision" style={{ padding: '48px 0', borderTop: '1px solid var(--colour-border)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{ margin: '0 0 24px' }}>Mission &amp; Vision</h2>
        {paragraphs.map((p, i) => (
          <p key={i} style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 16,
            lineHeight: 1.7,
            color: 'var(--colour-text)',
            marginBottom: 18,
          }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
