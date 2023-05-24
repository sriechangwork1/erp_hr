import React from 'react';
import AppComponentHeader from '@crema/components/AppComponentHeader';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppComponentCard from '@crema/components/AppComponentCard';

import BasicDatePicker from './BasicDatePicker';

import BasicDatePickerSource from 'raw-loader!./BasicDatePicker';
import StaticDatePickerDemo from './StaticDatePickerDemo';

import StaticDatePickerDemoSource from 'raw-loader!./StaticDatePickerDemo';
import FormPropsDatePickers from './FormPropsDatePickers';

import FormPropsDatePickersSource from 'raw-loader!./FormPropsDatePickers';
import LocalizedDatePicker from './LocalizedDatePicker';

import LocalizedDatePickerSource from 'raw-loader!./LocalizedDatePicker';
import JalaliCalendarSystem from './JalaliCalendarSystem';

import JalaliCalendarSystemSource from 'raw-loader!./JalaliCalendarSystem';
import ViewsDatePicker from './ViewsDatePicker';

import ViewsDatePickerSource from 'raw-loader!./ViewsDatePicker';
import StaticDatePickerLandscape from './StaticDatePickerLandscape';

import StaticDatePickerLandscapeSource from 'raw-loader!./StaticDatePickerLandscape';
import HelperText from './HelperText';

import HelperTextSource from 'raw-loader!./HelperText';

const DatePicker = () => {
  return (
    <>
      <AppComponentHeader
        title="Date Picker"
        description="Date pickers let the user select a date."
        refUrl="https://mui.com/components/date-picker/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic usage"
            component={BasicDatePicker}
            source={BasicDatePickerSource}
            noScrollbar
            description="The date picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Helper text"
            component={HelperText}
            source={HelperTextSource}
            noScrollbar
            description="You can show a helper text with the date format accepted."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Form props"
            component={FormPropsDatePickers}
            source={FormPropsDatePickersSource}
            noScrollbar
            description="The date picker component can be disabled or read-only."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Localization"
            component={LocalizedDatePicker}
            source={LocalizedDatePickerSource}
            noScrollbar
            description="Use LocalizationProvider to change the date-engine locale that is used to render the date picker. Here is an example of changing the locale for the date-fns adapter:"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Jalali Calendar System"
            component={JalaliCalendarSystem}
            source={JalaliCalendarSystemSource}
            noScrollbar
            description="Install date-fns-jalali and use @date-io/date-fns-jalali adapter to support Jalali calendar."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Static mode"
            component={StaticDatePickerDemo}
            source={StaticDatePickerDemoSource}
            noScrollbar
            description="Its possible to render any date picker without the modal/popover and text field."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Views playground"
            component={ViewsDatePicker}
            source={ViewsDatePickerSource}
            noScrollbar
            description="Its possible to combine year, month, and date selection views. Views will appear in the order theyre included in the views array."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Landscape orientation"
            component={StaticDatePickerLandscape}
            source={StaticDatePickerLandscapeSource}
            noScrollbar
            description="For ease of use, the date picker will automatically change the layout between portrait and landscape by subscription to the window.orientation change."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default DatePicker;
