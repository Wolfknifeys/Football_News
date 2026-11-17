تطبيق أخبار الكرة — مجاني، ويتجدد تلقائيًا عدة مرات في اليوم

1) أنشئ حسابًا مجانيًا في github.com
2) New repository ← الاسم: football-news ← اختر Public ← Create repository
3) في صفحة المستودع اضغط «uploading an existing file» ← اسحب كل ملفات هذا المجلد (مع مجلد .github) ← Commit changes
   إذا لم يُرفع مجلد .github: Add file ← Create new file ← اكتب في خانة الاسم: .github/workflows/update-news.yml ← الصق محتوى ملف github-workflow.yml ← Commit
4) Settings ← Pages ← Source: Deploy from a branch ← Branch: main و /(root) ← Save
   بعد دقيقة يظهر رابط تطبيقك: https://اسم-حسابك.github.io/football-news/
5) تبويب Actions ← (اضغط الزر الأخضر للتفعيل إن ظهر) ← Update news ← Run workflow
   انتظر علامة ✓ خضراء. من الآن تتجدد الأخبار وحدها.
6) افتح الرابط في الهاتف ← قائمة المتصفح ← «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية» ← شارك الرابط مع الناس.

اختياري — ملف APK لأندرويد: انسخ رابط التطبيق إلى pwabuilder.com ← Package for stores ← Android.
لتغيير المواضيع: عدّل القائمة Q في أعلى ملف update-news.mjs.
إذا توقفت التحديثات بعد شهرين بلا نشاط: تبويب Actions ← Enable.
الأخبار عناوين فقط من أخبار Google مع رابط للمصدر.
