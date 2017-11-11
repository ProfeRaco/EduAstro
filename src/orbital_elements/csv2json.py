import os

cwd = os.getcwd()
pathRead = os.path.join(cwd, 'csv')
pathWrite = os.path.join(cwd, 'json')

for f in os.listdir(pathRead):

    fid = open(os.path.join(pathRead, f), 'rU')
    fid_write = open(os.path.join(pathWrite, f[:-4] + '.json'), 'w+')

    inOrbitalElements = False

    fid_write.write('[\n')

    string2Write = ''

    for (i, line) in enumerate(fid):

        if line.count('$$EOE') > 0:
            inOrbitalElements = False

        if inOrbitalElements:

            string2Write = string2Write + '{'

            orbitalElementsArray = line.split(',')

            JDTDB = orbitalElementsArray[0].strip()
            # TDB = orbitalElementsArray[1].strip()
            EC = orbitalElementsArray[2].strip()
            # QR = orbitalElementsArray[3].strip()
            IN = orbitalElementsArray[4].strip()
            OM = orbitalElementsArray[5].strip()
            W = orbitalElementsArray[6].strip()
            # Tp = orbitalElementsArray[7].strip()
            # N = orbitalElementsArray[8].strip()
            # MA = orbitalElementsArray[9].strip()
            TA = orbitalElementsArray[10].strip()
            A = orbitalElementsArray[11].strip()
            # AD = orbitalElementsArray[12].strip()
            # PR = orbitalElementsArray[13].strip()

            string2Write = string2Write + '"JDTDB": ' + JDTDB + ','
            # fid_write.write('"TDB": "' + TDB + '",')
            string2Write = string2Write + '"EC": ' + EC + ','
            # fid_write.write('"QR": ' + QR + ',')
            string2Write = string2Write + '"IN": ' + IN + ','
            string2Write = string2Write + '"OM": ' + OM + ','
            string2Write = string2Write + '"W": ' + W + ','
            # fid_write.write('"Tp": ' + Tp + ',')
            # fid_write.write('"N": ' + N + ',')
            # fid_write.write('"MA": ' + MA + ',')
            string2Write = string2Write + '"TA": ' + TA + ','
            string2Write = string2Write + '"A": ' + A
            # fid_write.write('"AD": ' + AD + ',')
            # fid_write.write('"PR": ' + PR + ',')

            string2Write = string2Write + '},\n'

        if line.count('$$SOE') > 0:
            inOrbitalElements = True

    fid_write.write(string2Write[:-2] + '\n')
    fid_write.write(']')
    fid.close()
    fid_write.close()
