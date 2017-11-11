import os

cwd = os.getcwd()
pathRead = os.path.join(cwd, 'csv')
pathWrite = os.path.join(cwd, 'json')

for f in os.listdir(pathRead):

    fid = open(os.path.join(pathRead, f), 'rU')
    fid_write = open(os.path.join(pathWrite, f[:-4] + '.json'), 'w+')

    inOrbitalElements = False

    fid_write.write('[\n')

    for line in fid:

        if line.count('$$EOE') > 0:
            inOrbitalElements = False

        if inOrbitalElements:

            fid_write.write('{')

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

            fid_write.write('"JDTDB": ' + JDTDB + ', ')
            # fid_write.write('"TDB": "' + TDB + '", ')
            fid_write.write('"EC": ' + EC + ', ')
            # fid_write.write('"QR": ' + QR + ', ')
            fid_write.write('"IN": ' + IN + ', ')
            fid_write.write('"OM": ' + OM + ', ')
            fid_write.write('"W": ' + W + ', ')
            # fid_write.write('"Tp": ' + Tp + ', ')
            # fid_write.write('"N": ' + N + ', ')
            # fid_write.write('"MA": ' + MA + ', ')
            fid_write.write('"TA": ' + TA + ', ')
            fid_write.write('"A": ' + A + ', ')
            # fid_write.write('"AD": ' + AD + ', ')
            # fid_write.write('"PR": ' + PR + ', ')

            fid_write.write('}\n')

        if line.count('$$SOE') > 0:
            inOrbitalElements = True

    fid_write.write(']')
    fid.close()
    fid_write.close()
