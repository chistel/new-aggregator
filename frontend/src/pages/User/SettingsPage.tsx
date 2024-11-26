import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { TValidationError, User } from '../../types';
import { MultiValue } from 'react-select';
import { mapSelectedPreferences, newsCategories, newsProviders, removeDuplicates } from '../../utils';
import { useDispatch } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton';
import { savePreference } from '../../redux/calls/Users/savePreference';
import { AppDispatch } from '../../redux/store';
import ReactSelectInput from '../../components/ReactSelectInput';
import InputError from '../../components/InputError';
import { clearValidationError } from '../../redux/reducers/authReducer';

interface ISettingsPageProps {
   user: User | null,
   isAuthenticated?: boolean,
   loading?: boolean,
   errors?: TValidationError | null,
}

const SettingsPage: FunctionComponent<ISettingsPageProps> = ({ user, isAuthenticated, loading, errors }) => {
   const dispatch: AppDispatch = useDispatch()

   const [selectedProviders, setSelectedProviders] = useState<MultiValue<{
      value: string;
      label: string;
   }> | null>(null);

   const [selectedCategories, setSelectedCategories] = useState<MultiValue<{
      value: string;
      label: string;
   }> | null>(null);

   const availableProviders = newsProviders();
   const availableCategories = newsCategories();

   useEffect(() => {
      dispatch(clearValidationError());
   }, []);

   useEffect(() => {
      if (user?.preference) {
         if (user.preference.providers) {
            const selectedProvidersData = mapSelectedPreferences(user.preference.providers, availableProviders);
            setSelectedProviders(removeDuplicates(selectedProvidersData));
         }

         if (user.preference.categories) {
            const selectedCategoriesData = mapSelectedPreferences(user.preference.categories, availableCategories);
            setSelectedCategories(removeDuplicates(selectedCategoriesData));
         }
      }
   }, [user]);


   const handlePreferenceSaving = useCallback(() => {
      dispatch(savePreference({
         providers: selectedProviders?.map(option => option.value) as string[],
         categories: selectedCategories?.map(option => option.value) as string[]
      }));
   }, [dispatch, selectedProviders, selectedCategories]);



   const handleSelectChange = (
      setter: React.Dispatch<React.SetStateAction<MultiValue<{ value: string; label: string }> | null>>,
      availableOptions: { value: string; label: string }[]
   ) => (newValue: MultiValue<{ value: string; label: string }>) => {
      const uniqueSelected = removeDuplicates([...newValue]);
      setter(uniqueSelected);
   };


   return (
      <div className="container h-full px-6 py-10">
         <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-3 md:gap-6">
               <div className="md:col-span-1 flex justify-between">
                  <div className="px-4 sm:px-0">
                     <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Preference</h3>
                     <p className="mt-1 text-sm text-gray-700 dark:text-gray-500">Manage news category and provider</p>
                  </div>
               </div>

               <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md">
                     <div className="grid grid-cols-6 gap-6 mt-4">
                        <ReactSelectInput
                           id="providers"
                           label="Providers"
                           availableOptions={availableProviders}
                           selectedValues={selectedProviders}
                           onChange={handleSelectChange(setSelectedProviders, availableProviders)}
                           isMultiple
                        />
                        {errors?.providers && <InputError message={errors.providers[0]}/>}
                     </div>
                     <div className="grid grid-cols-6 gap-6 mt-4">
                        <ReactSelectInput
                           id="categories"
                           label="Categories"
                           availableOptions={availableCategories}
                           selectedValues={selectedCategories}
                           onChange={handleSelectChange(setSelectedCategories, availableCategories)}
                           isMultiple
                        />
                        {errors?.categories && <InputError message={errors.categories[0]}/>}

                     </div>
                  </div>

                  <div className="flex items-center opaci justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-end sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
                     <PrimaryButton type="submit" onClick={handlePreferenceSaving}
                                    className="disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={loading}>
                        <span className={loading ? "opacity-50" : ""}>Save</span>
                     </PrimaryButton>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SettingsPage;
