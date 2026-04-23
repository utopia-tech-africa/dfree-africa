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

      // ---------------- Store ----------------
      S.listItem()
        .title('Store')
        .icon(ShoppingBag)
        .child(
          S.list()
            .title('Store')
            .items([S.documentTypeListItem('store').title('All Products')]),
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
        (id) => !['project', 'gallery', 'year', 'store', 'pastSpeaker'].includes(id.getId() ?? ''),
      ),
    ])
