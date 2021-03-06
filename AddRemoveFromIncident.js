///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'jimu/BaseFeatureAction',
  'jimu/WidgetManager',
  'dojo/_base/array'
], function (declare, BaseFeatureAction, WidgetManager, array) {
  var clazz = declare(BaseFeatureAction, {
    map: null,
    iconFormat: 'png',

    isFeatureSupported: function (featureSet) {
      var hasIncident = false;
      var loaded = WidgetManager.getInstance().loaded;
      if (loaded) {
        array.forEach(loaded, function (w) {
          if (w.name === "SituationAwareness") {
            if (w.incidents.length > 0) {
              hasIncident = true;
            }
          }
        });
      }

      if (featureSet.features.length !== 1 || !hasIncident || !featureSet.features[0].geometry) {
        return false;
      }

      return true;
    },

    onExecute: function (featureSet) {
      return WidgetManager.getInstance().triggerWidgetOpen(this.widgetId)
      .then(function (widget) {
        widget._setEventLocation({
          feature: featureSet.features[0],
          type: 'addRemove'
        });
      });
    }
  });
  return clazz;
});