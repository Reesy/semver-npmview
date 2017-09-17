#! /usr/bin/env node

const userArgs = process.argv.slice(2);
const packageJson = require('package-json');
// console.log("This is the userArgs[0]: " + userArgs[0]);
// console.log("This is the userArgs[1]: " + userArgs[1]);
// console.log("This is the userArgs[2]: " + userArgs[3]);
/**
 * This needs work, currently the returned packages from 
 * packageJSON are sorted by publish date, getLatest will return
 * the latest published version, and not the highest numerical version 
 * for the given pattern
 */
exports.getLatest = function(desiredPackage, versions, prerelease){
	return packageJson(desiredPackage, {allVersions:true})
		.then((packages) => {
			var allVersions = Object.keys(packages.versions);
			var alphaVersions = [];
			for(var position in allVersions) {
				if(allVersions[position].includes(versions) && 
				   allVersions[position].includes(prerelease)){
					alphaVersions.push(allVersions[position]);
				}
			}
			if(alphaVersions.length > 1){
				//return alphaVersions[alphaVersions.length-1]
				return this.reconstructVersion(versions, prerelease, alphaVersions.length - 1)
			}
			return alphaVersions[0];
		}).catch((error) => {
			console.log("inside error catch" + error);
			return "";
		});
}
/**
 * @name reconstructVersion
 * @desc This function will reconstruct the string output as sort order of packages is non deterministic
 * as such this will take the number of 'tags' found for a version such as 'alpha' or 'beta' and use the length as
 * the number of packages currently published
 * @param version - The version of wish to find latest
 * @param prereleaseTag - The potential prerelease version specified
 * @param latestPublishNumber - Iteration of the the specified package 
 */
exports.reconstructVersion = function(version, prereleaseTag, latestPublishNumber){
	return version + '-' + prereleaseTag + "." + latestPublishNumber;
}

// this.getLatest("sigma-cpq-quote", "2.5.0", "Pricing")
// 	.then((result) => {
// 		console.log(result);
// 		return result;

// 	})
// 	.catch((error) => {
// 		return error;
// 	});

this.getLatest(userArgs[0], userArgs[1], userArgs[2])
	.then((result) => {
		console.log(result);
		return result;

	})
	.catch((error) => {
		return error;
	});