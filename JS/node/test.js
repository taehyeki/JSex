
var fs = require('fs');
process.stdout.write(Buffer.from('> '));
process.stdin.on('data',function(buf){
  var a = buf.toString();
  


  if (a.indexOf('ls') != -1){
    var dir = fs.opendirSync('.');
    while(1){
      var dirent = dir.readSync();
      if(dirent == null) break; 
      console.log(dirent.name);
    }
    dir.close();
  }

  if (a.indexOf('cat') != -1){
    var cnt = 3;
    while(1){
      if(a.slice(cnt,cnt+1) == ' '){ 
        cnt++;
      } else {
        break
      }
    }
    var pureName = a.slice(cnt);
    var pp =pureName.slice(0,-2);
  
    var readN =fs.readFileSync('./' +pp);
    process.stdout.write(readN+'\n');
    
  }

  if (a.indexOf('info') != -1){
    var cnt = 4;
    while(1){
      if(a.slice(cnt,cnt+1) == ' '){ 
        cnt++;
      } else {
        break
      }
    }
    var pureName = a.slice(cnt);
    var pp =pureName.slice(0,-2);

    var statN =fs.statSync('./' +pp);
    process.stdout.write('용량 : '+ statN.size+'\n');
    process.stdout.write('생성시각 : '+ statN.ctime+'\n');
    process.stdout.write('폴더 유무 : ' + (statN.isDirectory() ? 'Dir' : 'NotDir') +'\n');
    process.stdout.write('바로가기 유무 : ' + (statN.isSymbolicLink()? 'SymLink' : 'NotSym') + '\n');
    
  }

  if (a.indexOf('delete') != -1){
    var cnt = 6;
    while(1){
      if(a.slice(cnt,cnt+1) == ' '){ 
        cnt++;
      } else {
        break
      }
    }
    var pureName = a.slice(cnt);
    var pp =pureName.slice(0,-2);
  
    if(fs.statSync('./'+pp).isDirectory()) fs.rmdirSync('./'+pp);
    else fs.unlinkSync('./' +pp);
  
    
  }



  if(a.indexOf('exit') != -1){
    process.exit();
  }
  process.stdout.write(Buffer.from('> '));
})