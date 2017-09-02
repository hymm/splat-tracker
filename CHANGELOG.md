# CHANGELOG

## Version 0.2.4
### New Features
* added radar charts to battle details
* user can now pick splatnet language in settings.  Support languages vary by region
* player level added in more info section of battle details
* copy a discord pastable json of battle stats to clipboard
* added estimate gachi power to last 50 battles table
* added translation support to results, records, and schedule (looking for translators)

### Bug Fixes 
* removed turf bonus points for ranked games
* calculation for per minutes stats was wrong, now fixed
* removed s+ numbers from details, splatnet was not sending the real numbers
* removed bonus from turf inked for ranked games uploaded to stat.ink
* added logging of uncaught errors to help with debugging

## Version 0.2.3

* add sloshing machine
* add forge pro
* add manta maria
* add highlighting for pure and shiny gear
* change stat.ink image from image_judge to image_result
* show session token expiration date on settings page
* added iksm tokem for debugging purposes
* show unuploaded battles on last 50 battles table
* change arrows to increment through array instead of battle number
* accept stat.ink 302 errors
* memoize or cache getting game details
* option to show stats as a rate on last 50 battles
* move stat.ink upload info into separate file

## Version 0.2.2
* added weapon images
* added sort order to details table
* added image from splatnet to stat.ink upload
* view gear in details
* changed to k+a(a) and k-d to make table more readable and compact
* fixed bug with bar not displaying on stat ink


## Version 0.2.1

* added squiffer
* map images on schedule page.  Thanks to DanSyor.
* added in google analytics.  See home page for more details.

## Version 0.2.0

* decreased poll timer from 120 seconds to 60 seconds
* records stat.ink battle address onto disk
* shows a link to battles uploaded to stat.ink
* api is now retrieved in users language
* added support for name and s plus number to be uploaded to stat.ink (stat.ink page does not yet display names)
* fixed bug with KO loss scores not being displayed on stat.ink and SquidTracks
* fixes bug with games being uploaded on refresh even when auto-upload was not enabled

## Version 0.1.6

* fixes bug with battles with null ranks not uploading to stat.ink
* added api checker for debugging

## Version 0.1.5

* added sorting to some tables
* fixed problem with turf inked not displaying correctly on stat.ink
* changed results dropdown so it doesn't show battle numbers where you dc'd
* better feedback when pressing buttons
* fixed bug with columns not lining up correctly
* fixed bug when displaying turf war in details

## Version 0.1.4

* added splatoon schedule page
* added umbrella to weapon mapping
* navigation is now fixed to top
* editted text for clarity
* added player ranks to result details
* other various improvements and fixes to the user experience

## Version 0.1.3
Initial Beta Release

* fixes problem with mapping Enperry and Hero Splat Dualies
