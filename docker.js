var spawn = require('child_process').spawnSync;
var path = require('path');

function usage() {
    var command = path.basename(process.argv[1]);
    console.log('Usage: ' + command + ' (build|push|all)');
    process.exit(1);
}

if (process.argv.length != 3) {
    usage();
}
var method = process.argv[2];
if (method != 'build' && method != 'push' && method != 'all') {
    usage();
}

var package = require(path.join(__dirname, 'package.json'));
var tag = 'spandich/' + package.name;

if (method == 'build' || method == 'all') {
    spawn(
        'docker', [
            'build',
            '--tag=' + tag + ':' + package.version,
            '.'
        ], {
            stdio: 'inherit'
        }
    );
}

if (method == 'push' || method == 'all') {
    spawn(
        'docker', [
            'push',
            tag
        ], {
            stdio: 'inherit'
        }
    );
}
