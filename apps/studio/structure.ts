import type {StructureResolver} from 'sanity/structure'
import {Folder, ReceiptCent, ShoppingBag, User2} from 'lucide-react' // optional icons for sections

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ---------------- Projects ----------------
      S.listItem()
        .title('Projects')
        .icon(Folder)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.documentTypeListItem('project').title('All Projects'),
              S.documentTypeListItem('gallery').title('Gallery Files'),
              S.documentTypeListItem('year').title('Project Years'),
            ]),
        ),

      // ---------------- News ----------------
      // S.listItem()
      //   .title('News')
      //   .icon(Book)
      //   .child(
      //     S.list()
      //       .title('News')
      //       .items([S.documentTypeListItem('news').title('All News')]),
      //   ),

      // ---------------- Merch ----------------
      S.listItem()
        .title('Merch')
        .icon(ShoppingBag)
        .child(
          S.list()
            .title('Merch')
            .items([S.documentTypeListItem('merch').title('All Products')]),
        ),

      // ---------------- FinFest ----------------
      S.listItem()
        .title('FinFest')
        .icon(ReceiptCent)
        .child(
          S.list()
            .title('FinFest')
            .items([S.documentTypeListItem('pastSpeaker').title('Past Speakers')]),
        ),

      // ---------------- Other ----------------
      ...S.documentTypeListItems().filter(
        (id) => !['project', 'gallery', 'year', 'merch', 'pastSpeaker'].includes(id.getId() ?? ''),
      ),
    ])
