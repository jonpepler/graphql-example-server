-- CreateTable
CREATE TABLE "Vote" (
"id" SERIAL,
    "linkId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote.linkId_unique" ON "Vote"("linkId");

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY("linkId")REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
