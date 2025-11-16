import { Scheme, UserProfile, EligibilityResult } from '../types';

export function checkEligibility(scheme: Scheme, userProfile: UserProfile): EligibilityResult {
  const missingCriteria: string[] = [];
  const improvementTips: string[] = [];
  let eligibilityScore = 0;
  let totalCriteria = 0;

  // Check age criteria
  if (scheme.eligibility.age) {
    totalCriteria++;
    const [minAge, maxAge] = scheme.eligibility.age;
    if (userProfile.age >= minAge && userProfile.age <= maxAge) {
      eligibilityScore++;
    } else {
      missingCriteria.push(`Age must be between ${minAge} and ${maxAge} years`);
      improvementTips.push(`Current age: ${userProfile.age}. You need to be between ${minAge}-${maxAge} years old.`);
    }
  }

  // Check income criteria
  if (scheme.eligibility.income) {
    totalCriteria++;
    if (userProfile.income <= scheme.eligibility.income) {
      eligibilityScore++;
    } else {
      missingCriteria.push(`Income must be below ₹${scheme.eligibility.income.toLocaleString()}`);
      improvementTips.push(`Your income (₹${userProfile.income.toLocaleString()}) exceeds the limit. Consider schemes with higher income limits.`);
    }
  }

  // Check occupation criteria
  if (scheme.eligibility.occupation) {
    totalCriteria++;
    if (scheme.eligibility.occupation.includes(userProfile.occupation)) {
      eligibilityScore++;
    } else {
      missingCriteria.push(`Occupation must be one of: ${scheme.eligibility.occupation.join(', ')}`);
      improvementTips.push(`Your occupation (${userProfile.occupation}) doesn't match. Consider career transitions or similar schemes.`);
    }
  }

  // Check location criteria
  if (scheme.eligibility.location) {
    totalCriteria++;
    if (scheme.eligibility.location.includes(userProfile.location)) {
      eligibilityScore++;
    } else {
      missingCriteria.push(`Location must be: ${scheme.eligibility.location.join(' or ')}`);
      improvementTips.push(`This scheme is only available in ${scheme.eligibility.location.join('/')} areas.`);
    }
  }

  // Check category criteria
  if (scheme.eligibility.category) {
    totalCriteria++;
    if (scheme.eligibility.category.includes(userProfile.category)) {
      eligibilityScore++;
    } else {
      missingCriteria.push(`Category must be: ${scheme.eligibility.category.join(' or ')}`);
      improvementTips.push(`This scheme is for ${scheme.eligibility.category.join('/')} categories only.`);
    }
  }

  // Check disability criteria
  if (scheme.eligibility.hasDisability !== undefined) {
    totalCriteria++;
    if (scheme.eligibility.hasDisability === userProfile.hasDisability) {
      eligibilityScore++;
    } else {
      missingCriteria.push(`Disability status requirement: ${scheme.eligibility.hasDisability ? 'Required' : 'Not required'}`);
      improvementTips.push(`This scheme ${scheme.eligibility.hasDisability ? 'requires' : 'does not require'} disability status.`);
    }
  }

  // Check land ownership criteria
  if (scheme.eligibility.landOwnership !== undefined) {
    totalCriteria++;
    if (scheme.eligibility.landOwnership === userProfile.landOwnership) {
      eligibilityScore++;
    } else {
      missingCriteria.push(`Land ownership requirement: ${scheme.eligibility.landOwnership ? 'Required' : 'Not required'}`);
      improvementTips.push(`You need to ${scheme.eligibility.landOwnership ? 'own' : 'not own'} land for this scheme.`);
    }
  }

  // Check education level criteria
  if (scheme.eligibility.educationLevel) {
    totalCriteria++;
    if (scheme.eligibility.educationLevel.includes(userProfile.educationLevel)) {
      eligibilityScore++;
    } else {
      missingCriteria.push(`Education level must be: ${scheme.eligibility.educationLevel.join(' or ')}`);
      improvementTips.push(`Required education: ${scheme.eligibility.educationLevel.join('/')}. Consider upgrading your education.`);
    }
  }

  // Calculate probability
  const probability = totalCriteria > 0 ? (eligibilityScore / totalCriteria) * 100 : 0;
  const eligible = eligibilityScore === totalCriteria;

  return {
    scheme,
    eligible,
    probability: Math.round(probability),
    missingCriteria,
    improvementTips,
  };
}

export function getRecommendedSchemes(schemes: Scheme[], userProfile: UserProfile): EligibilityResult[] {
  return schemes
    .map(scheme => checkEligibility(scheme, userProfile))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 10);
}

export function predictEligibilityTrends(schemes: Scheme[], userProfile: UserProfile) {
  const results = schemes.map(scheme => checkEligibility(scheme, userProfile));
  const eligible = results.filter(r => r.eligible).length;
  const partiallyEligible = results.filter(r => r.probability > 50 && !r.eligible).length;
  const totalSchemes = schemes.length;

  return {
    eligible,
    partiallyEligible,
    totalSchemes,
    eligibilityRate: Math.round((eligible / totalSchemes) * 100),
    averageProbability: Math.round(results.reduce((sum, r) => sum + r.probability, 0) / results.length),
    topCategory: getMostEligibleCategory(results),
  };
}

function getMostEligibleCategory(results: EligibilityResult[]): string {
  const categoryScores: { [key: string]: number } = {};
  
  results.forEach(result => {
    const category = result.scheme.category;
    if (!categoryScores[category]) {
      categoryScores[category] = 0;
    }
    categoryScores[category] += result.probability;
  });

  return Object.keys(categoryScores).reduce((a, b) => 
    categoryScores[a] > categoryScores[b] ? a : b
  );
}