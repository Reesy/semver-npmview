#! /usr/bin/env node

const userArgs = process.argv.slice(2);
const packageJson = require('package-json');


/**
 * @name getLatestPreReleaseVersion
 * @desc for a given package, version and prerelease tag this will return a string of that version number
 * for instance if there exists a package called 'myPackage' and 1.0.0 has alpha versions alpha.1, alpha.2
 * then passing in (myPackage, 1.0.0, alpha) will return  1.0.0-alpha.2
 * @param {String} desiredPackage 
 * @param {String} versions 
 * @param {String} prerelease 
 */
exports.getLatestPreReleaseVersion = function(desiredPackage, versions, prerelease){
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
 * @name getLatestPackageVersion
 * @desc This uses the package-json plugin to return latest version of a given package, to the nearest semver range
 * @param {String} desiredPackage 
 * @param {String} versions 
 */
exports.getLatestPackageVersion = function(desiredPackage, versions){
	return packageJson(desiredPackage, {version: versions})
		.then((packages) => {
			return packages.version;
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

if( typeof(userArgs[0]) !== "undefined" && typeof(userArgs[1]) !== "undefined" && typeof(userArgs[2]) !== "undefined")
{
	this.getLatestPreReleaseVersion(userArgs[0], userArgs[1], userArgs[2])
		.then((result) => {
			console.log(result);
			return result;

		})
		.catch((error) => {
			return error;
		});
}
else if (typeof(userArgs[0]) !== "undefined" && typeof(userArgs[1]) !== "undefined" && typeof(userArgs[2]) === "undefined")
{
	this.getLatestPackageVersion(userArgs[0], userArgs[1])
	.then((result) => {
		console.log(result);
		return result;

	})
	.catch((error) => {
		return error;
	});
}