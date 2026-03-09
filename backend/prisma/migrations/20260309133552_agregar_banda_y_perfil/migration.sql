-- AlterTable
ALTER TABLE "Concert" ADD COLUMN     "banda" TEXT NOT NULL DEFAULT 'Por definir',
ADD COLUMN     "descripcion" TEXT NOT NULL DEFAULT 'Sin descripción',
ADD COLUMN     "fotoConcierto" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fotoPerfil" TEXT;
