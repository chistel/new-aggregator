export const newsProviders = () => {
   return [
      {value: 'news-api', label: 'NewsAPI'},
      {value: 'guardian', label: 'The Guardian'},
      {value: 'nyt', label: 'The New York Times'},
   ]
}

export const newsCategories = () => {
   return [
      {value: 'us', label: 'Us'},
      {value: 'world', label: 'World'},
      {value: 'art', label: 'Art'},
      {value: 'sport', label: 'Sport'},
      {value: 'politics', label: 'Politics'},
      {value: 'business', label: 'Business'},
      {value: 'style', label: 'Style'},
      {value: 'magazine', label: 'Magazine'},
      {value: 'technology', label: 'Technology'},
      {value: 'fashion', label: 'Fashion'},
      {value: 'opinion', label: 'Opinion'},
      {value: 'weather', label: 'Weather'},
      {value: 'health', label: 'Health'},
      {value: 'travel', label: 'Travel'},
      {value: 'upshot', label: 'Upshot'},
      {value: 'podcasts', label: 'Podcasts'},
      {value: 'dinning', label: 'Dinning'},
      {value: 'briefing', label: 'Briefing'},
      {value: 'art', label: 'Art'},
      {value: 'art', label: 'Art'},
      {value: 'art', label: 'Art'},

   ]
}

export const mapSelectedPreferences = (
   selectedValues: string[],
   availableOptions: { value: string; label: string }[]
) => {
   return availableOptions.filter(option => selectedValues.includes(option.value));
};

export const removeDuplicates = (selected: { value: string; label: string }[]) => {
   return Array.from(new Map(selected.map(item => [item.value, item])).values());
};
